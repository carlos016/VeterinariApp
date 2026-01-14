import { Owner } from "@/domain/entities/Owner";
import { OwnerRepository } from "@/domain/repositories/OwnerRepository";
import { Result } from "@/domain/shared/Result";
import { DNI } from "@/domain/value-objects/DNI";
export class CreateOwnerUseCase {
  constructor(private readonly ownerRepository: OwnerRepository) {}

  async execute(input: {
    dni: string;
    name: string;
    middleName: string;
    lastName?: string;
    phone?: string;
  }): Promise<Result<void>> {
    const allOwners = await this.ownerRepository.findAll();
    const isDuplicate = allOwners.some((o) => o.dni.getValue() === input.dni);

    if (isDuplicate) {
      return Result.fail("El DNI ya está registrado");
    }

    try {
      const owner = new Owner(
        null,
        DNI.create(input.dni),
        input.name,
        input.middleName,
        input.lastName,
        input.phone
      );

      await this.ownerRepository.save(owner);
      return Result.ok();
    } catch (error) {
      return Result.fail("Error inesperado al crear el propietario");
    }
  }
}
