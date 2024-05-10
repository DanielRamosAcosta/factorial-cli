import { Employee } from "./Employee.js";
import { z } from "zod";

export const MySelf = Employee.extend({
  country: z.enum(["es"]),
  state: z.string(),
  postalCode: z.string(),
  city: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string().nullable(),
  countryMetadata: z.object({
    id: z.number(),
    irpfInCents: z.number().nullable(),
    socialSecurityNumber: z.string().nullable(),
    hasWorkPermit: z.boolean().nullable(),
  }),
  contactName: z.string().nullable(),
  contactNumber: z.string().nullable(),
  phoneNumber: z.string(),
  hiredOn: z.string().nullable(),
  identifier: z.string(),
  identifierType: z.enum(["dni"]),
  gender: z.string(),
  nationality: z.enum(["es"]),
  birthdayOn: z.string(),
  bankNumber: z.string(),
  swiftBic: z.string().nullable(),
  bankNumberFormat: z.string().nullable(),
  companyIdentifier: z.string().nullable(),
  baseCompensationType: z.string().nullable(),
  baseCompensationAmountInCents: z.number().nullable(),
  terminatedOn: z.string().nullable(),
  isTerminating: z.boolean(),
  terminationReasonType: z.string().nullable(),
  terminationTypeDescription: z.string().nullable(),
});

export type MySelf = z.infer<typeof MySelf>;

export function isMySelf(employee: Employee | MySelf): employee is MySelf {
  return (
    Boolean(employee) &&
    typeof employee === "object" &&
    "birthdayOn" in employee
  );
}
