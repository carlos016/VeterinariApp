import { Owner } from "@/domain/entities/Owner";
import { OwnerRepository } from "@/domain/repositories/OwnerRepository";
import { DNI } from "@/domain/value-objects/DNI";
import { describe, expect, it, vi } from "vitest";
import { CreateOwnerUseCase } from "./CreateOwnerUseCase";

describe("CreateOwnerUseCase", () => {
  it("debería llamar al repositorio para guardar un propietario válido", async () => {
    const mockRepo: OwnerRepository = {
      save: vi.fn(),
      findAll: vi.fn(async () => []),
    };

    const useCase = new CreateOwnerUseCase(mockRepo);
    const ownerData = {
      dni: "12345678Z",
      name: "Carlos",
      middleName: "García",
      lastName: "González",
    };

    const result = await useCase.execute(ownerData);

    expect(result.isSuccess).toBe(true);
    expect(mockRepo.save).toHaveBeenCalledTimes(1);
  });

  it("debería devolver un fallo si el DNI ya está registrado", async () => {
    const mockRepo: OwnerRepository = {
      save: vi.fn(),
      findAll: vi.fn(async () => [
        new Owner(1, DNI.create("12345678Z"), "Juan", "Pérez"),
      ]),
    };

    const useCase = new CreateOwnerUseCase(mockRepo);
    const duplicateData = {
      dni: "12345678Z",
      name: "Carlos",
      middleName: "García",
    };

    const result = await useCase.execute(duplicateData);

    expect(result.isFailure).toBe(true);
    expect(result.getError().message).toBe("El DNI ya está registrado");

    expect(mockRepo.save).not.toHaveBeenCalled();
  });
});
