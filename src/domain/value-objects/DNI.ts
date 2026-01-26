export class DNI {
  private constructor(private readonly value: string) {}

  public static create(value: string): DNI {
    if (!/^[0-9]{8}[A-Z]$/.test(value)) {
      throw new Error('Formato de DNI inválido');
    }
    return new DNI(value);
  }

  public getValue(): string { return this.value; }
}