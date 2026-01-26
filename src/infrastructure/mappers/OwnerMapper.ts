import { Owner } from "@/domain/entities/Owner";
import { DNI } from "@/domain/value-objects/DNI";
import { Owner as PrismaOwner } from "@prisma/client";

export class OwnerMapper {
  static toDomain(raw: PrismaOwner): Owner {
    return new Owner(
      raw.id,
      DNI.create(raw.dni),
      raw.name,
      raw.middleName,
      raw.lastName || undefined,
      raw.phone || undefined
    );
  }

  static toPersistence(owner: Owner) {
    return {
      dni: owner.dni.getValue(),
      name: owner.name,
      middleName: owner.middleName,
      lastName: owner.lastName,
      phone: owner.phone,
    };
  }
}
