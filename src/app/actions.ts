"use server";

import { CreateOwnerUseCase } from "@/application/use-cases/CreateOwnerUseCase";
import { PrismaOwnerRepository } from "@/infrastructure/persistence/PrismaOwnerRepository";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createOwnerAction(prevState: any, formData: FormData) {
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
    return { error: "Error en la base de datos.", success: false };
  }
}

export async function createFarmAction(prevState: any, formData: FormData) {
  const regaCode = formData.get("regaCode") as string;
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const ownerId = formData.get("ownerId") as string;

  try {
    await prisma.farm.create({
      data: {
        regaCode: regaCode,
        name: name,
        address: address,
        owner: {
          connect: { id: parseInt(ownerId) },
        },
      },
    });

    revalidatePath("/");
    return { error: null, success: true };
  } catch (err) {
    console.error("Error al crear granja:", err);
    return {
      error: "Error al guardar la granja. ¿Código REGA duplicado?",
      success: false,
    };
  }
}
