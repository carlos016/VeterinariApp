import { Owner } from "@/domain/entities/Owner";
import { OwnerRepository } from "@/domain/repositories/OwnerRepository";
import { DNI } from "@/domain/value-objects/DNI";
export class CreateOwnerUseCase {
  constructor(private readonly ownerRepository: OwnerRepository) {}

  async execute(input: {
    dni: string;
    name: string; // Cambiado
    middleName: string; // Cambiado
    lastName?: string; // Cambiado
    phone?: string;
  }): Promise<void> {
    const allOwners = await this.ownerRepository.findAll();
    if (allOwners.some((o) => o.dni.getValue() === input.dni)) {
      throw new Error("El DNI ya está registrado");
    }

    const owner = new Owner(
      null,
      DNI.create(input.dni),
      input.name,
      input.middleName,
      input.lastName,
      input.phone
    );

    await this.ownerRepository.save(owner);
  }
}
