import { HttpClient } from "./HttpClient.ts";

type AddCustomFieldRequest = {
  field_id: number;
  value: string;
};

type AddCustomFieldResponse = {
  id: number;
  label: string;
  value: string;
  field_id: number;
  required: true;
  instance_id: number;
};

export const createCustomFieldAdder =
  (client: HttpClient) =>
  (shiftId: number, createShiftRequest: AddCustomFieldRequest) =>
    client
      .post<AddCustomFieldResponse>(
        `/api/v1/custom_fields/values`,
        {
          value: createShiftRequest.value,
        }, 
        {
          params: {
            field_id: createShiftRequest.field_id,
            instance_id: shiftId
          },
        }
      )
      .then((response) => response.data);
