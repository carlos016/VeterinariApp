"use server";

import { CreateOwnerUseCase } from "@/application/use-cases/CreateOwnerUseCase";
import { PrismaOwnerRepository } from "@/infrastructure/persistence/PrismaOwnerRepository";
import { revalidatePath } from "next/cache";

export async function createOwnerAction(formData: FormData) {
  const repository = new PrismaOwnerRepository();
  const useCase = new CreateOwnerUseCase(repository);

  try {
    await useCase.execute({
      dni: formData.get("dni") as string,
      name: formData.get("name") as string,
      middleName: formData.get("middleName") as string,
      lastName: (formData.get("lastName") as string) || undefined,
      phone: (formData.get("phone") as string) || undefined,
    });

    revalidatePath("/");
  } catch (error) {
    console.error("Error al crear propietario:", error);
  }
}
