import { HttpClient } from "./HttpClient.ts";

type AddCustomFieldRequest = {
  field_id: number;
  instance_id: number;
  model: "attendance-shift";
  value: string;
};

type AddCustomFiledResponse = {
  field_id: number;
  id: number;
  installed: false;
  instance_id: number;
  label: string;
  required: true;
  type: "single_choice";
  value: string;
};

export const createCustomFieldAdder =
  (client: HttpClient) =>
  (shiftId: number, createShiftRequest: AddCustomFieldRequest) =>
    client
      .post<AddCustomFiledResponse>(
        `/custom_fields/values/attendance-shift/${shiftId}`,
        {
          field_id: createShiftRequest.field_id,
          instance_id: createShiftRequest.instance_id,
          model: createShiftRequest.model,
          value: createShiftRequest.value,
        }
      )
      .then((response) => response.data);
