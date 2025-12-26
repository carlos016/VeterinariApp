"use server";
import { PrismaOwnerRepository } from "@/src/infrastructure/persistence/PrismaOwnerRepository";
import { CreateOwnerUseCase } from "@/src/application/use-cases/CreateOwnerUseCase";
import { revalidatePath } from "next/cache";

const repo = new PrismaOwnerRepository();
const createOwnerUseCase = new CreateOwnerUseCase(repo);

export async function createOwner(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  await createOwnerUseCase.execute(data);
  revalidatePath("/");
}