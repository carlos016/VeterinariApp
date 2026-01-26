"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { useActionState } from "react";
import { createOwnerAction } from "./actions";

interface Owner {
  id: number;
  dni: string;
  name: string;
  middleName: string;
  lastName: string | null;
  phone: string | null;
}

export default async function Home() {
  const owners = (await prisma.owner.findMany({
    orderBy: { id: "desc" },
  })) as Owner[];

  const [state, formAction] = useActionState(createOwnerAction, {
    error: null,
    success: false,
  });

  return (
    <main className="container mx-auto py-10 px-4 space-y-8 max-w-6xl">
      <header className="text-left border-b pb-6">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
          VeterinariApp <span className="text-3xl">🐾</span>
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Gestión profesional de propietarios y fincas
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {}
        <section className="lg:col-span-5">
          <Card className="shadow-lg border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle>Nuevo Propietario</CardTitle>
              <CardDescription>
                Registre los datos personales del dueño.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={formAction} className="flex flex-col gap-5">
                <div className="space-y-2">
                  <Label htmlFor="dni">DNI / NIE</Label>
                  <Input id="dni" name="dni" placeholder="12345678Z" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ej. Juan"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="middleName">Primer Apellido</Label>
                    <Input
                      id="middleName"
                      name="middleName"
                      placeholder="Pérez"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Segundo Apellido</Label>
                    <Input id="lastName" name="lastName" placeholder="García" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono de contacto</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="600000000"
                  />
                </div>

                {state?.error && <p className="text-red-500">{state.error}</p>}

                <Button
                  type="submit"
                  className="w-full mt-2 font-bold py-6 text-lg"
                >
                  Guardar Propietario
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {}
        <section className="lg:col-span-7">
          <Card className="shadow-md overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle>Listado de Dueños</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-bold py-4">DNI</TableHead>
                    <TableHead className="font-bold">Nombre Completo</TableHead>
                    <TableHead className="font-bold text-right pr-6">
                      Teléfono
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {owners.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center py-12 text-muted-foreground"
                      >
                        No hay propietarios registrados todavía.
                      </TableCell>
                    </TableRow>
                  ) : (
                    owners.map((owner) => (
                      <TableRow
                        key={owner.id}
                        className="hover:bg-muted/20 transition-colors"
                      >
                        <TableCell className="font-mono font-medium">
                          {owner.dni}
                        </TableCell>
                        <TableCell className="capitalize font-medium">
                          {`${owner.name} ${owner.middleName} ${
                            owner.lastName || ""
                          }`}
                        </TableCell>
                        <TableCell className="text-right pr-6 text-muted-foreground">
                          {owner.phone || "—"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
