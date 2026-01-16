"use server";

import { CreateOwnerUseCase } from "@/application/use-cases/CreateOwnerUseCase";
import { PrismaOwnerRepository } from "@/infrastructure/persistence/PrismaOwnerRepository";
import { revalidatePath } from "next/cache";

export async function createOwnerAction(formData: FormData): Promise<void> {
  if (!formData) {
    console.error("❌ No se recibió FormData");
    return;
  }

  const dni = formData.get("dni") as string;
  console.log("🚀 EJECUTANDO ACCIÓN PARA DNI:", dni);

  const repository = new PrismaOwnerRepository();
  const useCase = new CreateOwnerUseCase(repository);

  try {
    const result = await useCase.execute({
      dni: dni,
      name: formData.get("name") as string,
      middleName: formData.get("middleName") as string,
      lastName: (formData.get("lastName") as string) || undefined,
      phone: (formData.get("phone") as string) || undefined,
    });

    if (result.isFailure) {
      console.log("⚠️ FALLO DE VALIDACIÓN:", result.getError().message);
      return;
    }

    console.log("✅ PROPIETARIO CREADO");
    revalidatePath("/");
  } catch (err) {
    console.error("🔥 ERROR EN BASE DE DATOS:", err);
  }
}
