import { z } from "zod";

export const Employee = z.object({
  accessId: z.number(),
  attendable: z.boolean(),
  attendanceEmployeesPolicyId: z.number(),
  attendanceEmployeesSettingId: z.number(),
  contractId: z.string().nullable(),
  employeeGroupId: z.number(),
  fiscalCountry: z.string(),
  hasRegularAccess: z.boolean(),
  id: z.number(),
  irpf: z.number().nullable(),
  isEligibleForPayroll: z.boolean(),
  isTerminating: z.boolean(),
  jobTitle: z.string().nullable(),
  legalEntityCurrency: z.enum(["EUR"]),
  locationId: z.number(),
  managedByCurrent: z.boolean(),
  managerId: z.number().nullable(),
  paymentFrequency: z.enum(["monthly"]),
  payrollHiringId: z.number(),
  preferredName: z.string().nullable(),
  pronouns: z.string().nullable(),
  regularAccessStartsOn: z.string().nullable(),
  showBirthday: z.boolean().optional(),
  supervisedByCurrent: z.boolean(),
  tenureStartDate: z.string().nullable(),
  terminatedOn: z.string().nullable(),
  terminationReasonType: z.string().nullable(),
  terminationTypeDescription: z.string().nullable(),
  timeoffManagerId: z.number().nullable(),
  timeoffPolicyId: z.number(),
  timeoffSupervisedByCurrent: z.boolean(),
});

export type Employee = z.infer<typeof Employee>;
