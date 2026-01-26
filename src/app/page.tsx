import { OwnerForm } from "@/components/OwnerForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";

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
          {}
          <OwnerForm />
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
                          {`${owner.name} ${owner.middleName} ${owner.lastName || ""}`}
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
