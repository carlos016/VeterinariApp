import { prisma } from "@/lib/prisma";
import { createOwner } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Definimos la forma de un Propietario para que TypeScript no se queje
interface Owner {
  id: number;
  dni: string;
  firstName: string;
  firstLastName: string;
  secondLastName: string | null;
  phone: string | null;
}

export default async function Home() {
  // Leemos los dueños de la DB
  const owners = await prisma.owner.findMany({
    orderBy: { id: 'desc' }
  }) as Owner[]; // Forzamos el tipo aquí para solucionar los errores de "any"

  return (
    <main className="container mx-auto py-10 px-4 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">VeterinariApp 🐾</h1>
        <p className="text-muted-foreground mt-2">Gestión profesional de propietarios y fincas</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Formulario de Registro */}
        <section className="lg:col-span-4">
          <Card className="shadow-lg border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle>Datos del Propietario</CardTitle>
            </CardHeader>
            <CardContent>
              <form action={createOwner} className="flex flex-col gap-4">
                <Input name="dni" placeholder="DNI / NIE" required />
                <Input name="firstName" placeholder="Nombre" required />
                <Input name="firstLastName" placeholder="Primer Apellido" required />
                <Input name="secondLastName" placeholder="Segundo Apellido" />
                <Input name="phone" type="tel" placeholder="Teléfono" />
                <Button type="submit" className="w-full mt-2">
                  Guardar Propietario
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        {/* Tabla de Resultados */}
        <section className="lg:col-span-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Listado de Dueños</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">DNI</TableHead>
                    <TableHead>Nombre Completo</TableHead>
                    <TableHead>Teléfono</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {owners.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                        No hay propietarios registrados todavía.
                      </TableCell>
                    </TableRow>
                  ) : (
                    owners.map((owner) => (
                      <TableRow key={owner.id}>
                        <TableCell className="font-medium">{owner.dni}</TableCell>
                        <TableCell>
                          {`${owner.firstName} ${owner.firstLastName} ${owner.secondLastName || ""}`}
                        </TableCell>
                        <TableCell>{owner.phone || "-"}</TableCell>
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