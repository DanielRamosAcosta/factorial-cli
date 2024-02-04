import { ShiftRepository } from "../../src/domain/repositories/ShiftRepository.js";

export class ShiftRepositoryFake implements ShiftRepository {
  async save(): Promise<void> {}

  async findBy(): Promise<[]> {
    return [];
  }

  async deleteBy(): Promise<void> {}
}
