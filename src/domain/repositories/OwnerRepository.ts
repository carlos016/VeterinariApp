import { Owner } from "../entities/Owner";

export interface OwnerRepository {
  save(owner: Owner): Promise<void>;
  findAll(): Promise<Owner[]>;
}