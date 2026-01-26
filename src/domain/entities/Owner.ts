import { DNI } from "../value-objects/DNI";

export class Owner {
  constructor(
    public readonly id: number | null,
    public readonly dni: DNI,
    public readonly name: string,
    public readonly middleName: string,
    public readonly lastName?: string,
    public readonly phone?: string
  ) {}

  public getFullName(): string {
    return `${this.name} ${this.middleName} ${this.lastName || ""}`.trim();
  }
}
