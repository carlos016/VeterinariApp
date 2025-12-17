"use server";

import { prisma } from "@/lib/prisma"; // El alias @ apunta a la raíz
import { revalidatePath } from "next/cache";

export async function createOwner(formData: FormData) {
  const dni = formData.get("dni") as string;
  const firstName = formData.get("firstName") as string;
  const firstLastName = formData.get("firstLastName") as string;
  const secondLastName = formData.get("secondLastName") as string;
  const phone = formData.get("phone") as string;

  try {
    await prisma.owner.create({
      data: {
        dni,
        firstName,
        firstLastName,
        secondLastName,
        phone,
      },
    });

    // Refresca la página para mostrar el nuevo dueño en la tabla
    revalidatePath("/"); 
  } catch (error) {
    console.error("Error al crear dueño:", error);
  }
}