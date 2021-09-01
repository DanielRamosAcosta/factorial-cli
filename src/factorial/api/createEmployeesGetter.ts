import { HttpClient } from "./HttpClient.ts";

interface Employee {
  access_id: number;
  birthday_on: string;
  hired_on: string;
  job_title: string;
  id: number;
  manager_id: number;
  managed_by_current: boolean;
  supervised_by_current: boolean;
  terminated_on?: any;
  is_terminating: boolean;
  timeoff_policy_id: number;
  timeoff_manager_id: number;
  timeoff_supervised_by_current: boolean;
  location_id: number;
  employee_group_id: number;
  payroll_hiring_id: number;
  is_eligible_for_payroll: boolean;
  attendable: boolean;
  attendance_employees_setting_id: number;
  payment_frequency: string;
  contract_id?: any;
  clocked_in: boolean;
  permissions: Permissions;
}

interface MySelf extends Employee {
  country: string;
  state: string;
  postal_code: string;
  city: string;
  address_line_1: string;
  address_line_2?: any;
  country_metadata: Countrymetadata;
  contact_name: string;
  contact_number: string;
  phone_number: string;
  identifier: string;
  identifier_type: string;
  gender: string;
  nationality: string;
  bank_number: string;
  base_compensation_type?: any;
  base_compensation_amount_in_cents?: any;
}

interface Countrymetadata {
  id: number;
  irpf_in_cents?: any;
  social_security_number: string;
  has_work_permit?: any;
}

interface Permissions {
  hirings: Hirings;
  leaves: Leaves;
  personal: Personal;
  termination: boolean;
  profile: Profile;
  documents: Personal;
}

interface Profile {
  email: Email;
}

interface Email {
  read: boolean;
}

interface Personal {
  read: boolean;
  edit: boolean;
}

interface Leaves {
  read: boolean;
  create: boolean;
  approve: boolean;
  manage_documents: boolean;
  update: boolean;
}

interface Hirings {
  read: boolean;
  edit: boolean;
  edit_gross_salary: boolean;
}

export type GetEmployeesResponse = Array<Employee | MySelf>;

export const createEmployeesGetter = (client: HttpClient) => () =>
  client
    .get<GetEmployeesResponse>("/employees")
    .then((response) => response.data);

export const isMySelf = (employee: Employee | MySelf): employee is MySelf =>
  "identifier" in employee;
