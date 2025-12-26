import { OwnerRepository } from "@/src/domain/repositories/OwnerRepository";
import { Owner } from "@/src/domain/entities/Owner";
import { DNI } from "@/src/domain/value-objects/DNI";

export class CreateOwnerUseCase {
  constructor(private ownerRepository: OwnerRepository) {}

  async execute(data: any) {
    const dni = DNI.create(data.dni);
    const owner = new Owner(
      null,
      dni,
      data.firstName,
      data.firstLastName,
      data.secondLastName,
      data.phone
    );
    return await this.ownerRepository.save(owner);
  }
}