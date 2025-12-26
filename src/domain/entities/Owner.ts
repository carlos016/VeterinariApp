import { DNI } from "../value-objects/DNI";

export class Owner {
  constructor(
    public readonly id: number | null,
    public readonly dni: DNI,
    public readonly firstName: string,
    public readonly firstLastName: string,
    public readonly secondLastName?: string,
    public readonly phone?: string
  ) {}

  public getFullName(): string {
    return `${this.firstName} ${this.firstLastName} ${this.secondLastName || ""}`.trim();
  }
}