import { describe, expect, it } from "vitest";
import { DNI } from "./DNI";

describe("DNI Value Object", () => {
  it("debería crear un DNI válido", () => {
    const validDni = "12345678Z";
    const dni = DNI.create(validDni);
    expect(dni.getValue()).toBe(validDni);
  });

  it("debería lanzar un error si el formato es incorrecto", () => {
    const invalidDni = "1234567A";
    expect(() => DNI.create(invalidDni)).toThrow("Formato de DNI inválido");
  });
});
