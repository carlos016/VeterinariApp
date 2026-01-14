"use server";

import { CreateOwnerUseCase } from "@/application/use-cases/CreateOwnerUseCase";
import { PrismaOwnerRepository } from "@/infrastructure/persistence/PrismaOwnerRepository";
import { revalidatePath } from "next/cache";

export async function createOwnerAction(arg1: any, arg2?: any) {
  const formData =
    arg2 instanceof FormData ? arg2 : arg1 instanceof FormData ? arg1 : null;

  if (!formData) {
    console.error(
      "❌ No se recibió FormData. Arg1:",
      typeof arg1,
      "Arg2:",
      typeof arg2
    );
    return {
      error: "Error interno: No se recibieron los datos del formulario.",
      success: false,
    };
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
      const errorMsg = result.getError().message;
      console.log("⚠️ FALLO DE VALIDACIÓN:", errorMsg);
      return { error: errorMsg, success: false };
    }

    console.log("✅ PROPIETARIO CREADO");
    revalidatePath("/");
    return { error: null, success: true };
  } catch (err) {
    console.error("🔥 ERROR EN BASE DE DATOS:", err);
    return { error: "Error al conectar con la base de datos.", success: false };
  }
}
