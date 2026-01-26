import { Owner } from "@/domain/entities/Owner";
import { OwnerRepository } from "@/domain/repositories/OwnerRepository";
import { prisma } from "@/lib/prisma";
import { OwnerMapper } from "../mappers/OwnerMapper";

export class PrismaOwnerRepository implements OwnerRepository {
  async save(owner: Owner): Promise<void> {
    const data = OwnerMapper.toPersistence(owner);
    await prisma.owner.create({ data });
  }

  async findAll(): Promise<Owner[]> {
    const rawOwners = await prisma.owner.findMany({ orderBy: { id: "desc" } });
    return rawOwners.map(OwnerMapper.toDomain);
  }
}
