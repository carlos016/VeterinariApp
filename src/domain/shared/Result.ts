export class DomainError {
  constructor(public readonly message: string, public readonly code?: string) {}
}

export class Result<T> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  private readonly _value?: T;
  private readonly _error?: DomainError;

  private constructor(isSuccess: boolean, error?: DomainError, value?: T) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this._value = value;
    this._error = error;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: string | DomainError): Result<U> {
    const domainError =
      typeof error === "string" ? new DomainError(error) : error;
    return new Result<U>(false, domainError);
  }

  public getValue(): T {
    if (this.isFailure) {
      throw new Error("No se puede obtener el valor de un resultado fallido.");
    }
    return this._value as T;
  }

  public getError(): DomainError {
    if (this.isSuccess) {
      throw new Error("No se puede obtener el error de un resultado exitoso.");
    }
    return this._error as DomainError;
  }
}
