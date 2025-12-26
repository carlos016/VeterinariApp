import { prisma } from "@/lib/prisma";
import { OwnerRepository } from "@/src/domain/repositories/OwnerRepository";
import { Owner } from "@/src/domain/entities/Owner";
import { DNI } from "@/src/domain/value-objects/DNI";

export class PrismaOwnerRepository implements OwnerRepository {
  async save(owner: Owner): Promise<void> {
    await prisma.owner.create({
      data: {
        dni: owner.dni.getValue(),
        firstName: owner.firstName,
        firstLastName: owner.firstLastName,
        secondLastName: owner.secondLastName,
        phone: owner.phone,
      }
    });
  }

  async findAll(): Promise<Owner[]> {
    const rawOwners = await prisma.owner.findMany({ orderBy: { id: 'desc' } });
    return rawOwners.map(raw => new Owner(
      raw.id,
      DNI.create(raw.dni),
      raw.firstName,
      raw.firstLastName,
      raw.secondLastName || undefined,
      raw.phone || undefined
    ));
  }
}