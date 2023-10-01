import { FactorialClient } from "../factorial-client/FactorialClient.js";
import { Employee } from "../../domain/models/Employee.js";
import { isMySelf } from "../factorial-client/schema/MySelf.js";
import { EmployeeRepository } from "../../domain/repositories/EmployeeRepository.js";

export class EmployeeRepositoryFactorial implements EmployeeRepository {
  constructor(private readonly factorial: FactorialClient) {}

  async getEmployees() {
    const employees = await this.factorial.getEmployees();

    return employees.map((employee) =>
      Employee.fromPrimitives({
        id: employee.id,
        isCurrentUser: isMySelf(employee),
      }),
    );
  }
}
