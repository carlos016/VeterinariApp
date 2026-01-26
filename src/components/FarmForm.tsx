"use client";

import { createFarmAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

interface OwnerOption {
  id: number;
  name: string;
  middleName: string;
}

export function FarmForm({ owners }: { owners: OwnerOption[] }) {
  const [state, formAction] = useActionState(createFarmAction, {
    error: null,
    success: false,
  });

  return (
    <Card className="shadow-lg border-t-4 border-t-green-600">
      <CardHeader>
        <CardTitle>Nueva Granja / Explotación</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="regaCode">Código REGA</Label>
            <Input
              id="regaCode"
              name="regaCode"
              placeholder="ES123456789"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nombre de la Granja</Label>
            <Input id="name" name="name" placeholder="Ej. Finca La Suerte" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Dirección de la Explotación</Label>
            <Input
              id="address"
              name="address"
              placeholder="Ej. Polígono 4, Parcela 12"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerId">Propietario</Label>
            <select
              id="ownerId"
              name="ownerId"
              className="w-full p-2 border rounded-md bg-background"
              required
            >
              <option value="">Seleccione un dueño...</option>
              {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name} {owner.middleName}
                </option>
              ))}
            </select>
          </div>

          {state?.error && (
            <p className="text-red-500 text-sm">{state.error}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800"
          >
            Registrar Granja
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
