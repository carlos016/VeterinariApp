"use server";

import { CreateOwnerUseCase } from "@/application/use-cases/CreateOwnerUseCase";
import { PrismaOwnerRepository } from "@/infrastructure/persistence/PrismaOwnerRepository";
import { revalidatePath } from "next/cache";

export async function createOwnerAction(formData: FormData) {
  const dni = formData.get("dni") as string;
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
      return { error: result.getError().message, success: false };
    }

    revalidatePath("/");
    return { error: null, success: true };
  } catch (err) {
    return { error: "Error al conectar con la base de datos.", success: false };
  }
}
