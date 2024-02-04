import { EmployeeRepository } from "../../src/domain/repositories/EmployeeRepository.js";
import { Employee } from "../../src/domain/models/Employee.js";

export class EmployeeRepositoryFake implements EmployeeRepository {
  async getEmployees(): Promise<Employee[]> {
    return [Employee.fromPrimitives({ id: 1, isCurrentUser: true })];
  }
}
