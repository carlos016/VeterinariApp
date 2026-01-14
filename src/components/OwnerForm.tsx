"use client";

import { createOwnerAction } from "@/app/actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { useState, useTransition } from "react";

export function OwnerForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);

    startTransition(async () => {
      const result = await createOwnerAction(null, formData);

      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        (document.getElementById("owner-form") as HTMLFormElement)?.reset();
      }
    });
  }

  return (
    <Card className="shadow-lg border-t-4 border-t-primary">
      <CardHeader>
        <CardTitle>Nuevo Propietario</CardTitle>
        <CardDescription>
          Registre los datos personales del dueño.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {}
        <form
          id="owner-form"
          action={handleSubmit}
          className="flex flex-col gap-5"
        >
          {error && (
            <Alert
              variant="destructive"
              className="bg-destructive/10 border-destructive"
            >
              <AlertDescription className="font-bold">
                ⚠️ {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="dni">DNI / NIE</Label>
            <Input id="dni" name="dni" placeholder="12345678Z" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" name="name" placeholder="Ej. Juan" required />
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
            <Input id="phone" name="phone" type="tel" placeholder="600000000" />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full mt-2 font-bold py-6 text-lg"
          >
            {isPending ? "Guardando..." : "Guardar Propietario"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
