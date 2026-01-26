import { FarmForm } from "@/components/FarmForm"; // Importamos el nuevo componente
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

// Tipado para mayor claridad
interface Owner {
  id: number;
  dni: string;
  name: string;
  middleName: string;
  lastName: string | null;
  phone: string | null;
}

export default async function Home() {
  // 1. Cargamos dueños y granjas en paralelo para mayor velocidad
  const [owners, farms] = await Promise.all([
    prisma.owner.findMany({ orderBy: { id: "desc" } }),
    prisma.farm.findMany({
      orderBy: { id: "desc" },
      include: { owner: true }, // Incluimos los datos del dueño de cada granja
    }),
  ]);

  return (
    <main className="container mx-auto py-10 px-4 space-y-12 max-w-6xl">
      <header className="text-left border-b pb-6">
        <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
          VeterinariApp <span className="text-3xl">🐾</span>
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Gestión profesional de propietarios y fincas
        </p>
      </header>

      {}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <OwnerForm />
          {}
          <FarmForm owners={owners} />
        </div>

        {}
        <div className="space-y-8">
          {}
          <Card className="shadow-md overflow-hidden">
            <CardHeader className="bg-muted/30">
              <CardTitle>Listado de Dueños</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-bold py-4 pl-4">DNI</TableHead>
                    <TableHead className="font-bold">Nombre</TableHead>
                    <TableHead className="font-bold text-right pr-6">
                      Teléfono
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {owners.map((owner) => (
                    <TableRow key={owner.id} className="hover:bg-muted/20">
                      <TableCell className="font-mono pl-4">
                        {owner.dni}
                      </TableCell>
                      <TableCell className="capitalize">{`${owner.name} ${owner.middleName}`}</TableCell>
                      <TableCell className="text-right pr-6">
                        {owner.phone || "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {}
          <Card className="shadow-md overflow-hidden border-t-4 border-t-green-600">
            <CardHeader className="bg-muted/30">
              <CardTitle>Listado de Granjas (REGA)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-bold py-4 pl-4">REGA</TableHead>
                    <TableHead className="font-bold">Nombre / Dueño</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {farms.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        className="text-center py-8 text-muted-foreground"
                      >
                        No hay granjas registradas.
                      </TableCell>
                    </TableRow>
                  ) : (
                    farms.map((farm) => (
                      <TableRow key={farm.id} className="hover:bg-muted/20">
                        <TableCell className="font-mono font-bold pl-4 text-green-700">
                          {farm.regaCode}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{farm.name || "Sin nombre"}</span>
                            <span className="text-xs text-muted-foreground italic">
                              Prop: {farm.owner.name} {farm.owner.middleName}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
