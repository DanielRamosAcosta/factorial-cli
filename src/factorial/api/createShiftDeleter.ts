import { HttpClient } from "./HttpClient.ts";

export type DeleteShiftRequest = {
  shiftId: number;
};

export type DeleteShiftResponse = void;

export const createShiftDeleter = (client: HttpClient) =>
  (
    deleteShiftRequest: DeleteShiftRequest,
  ) =>
    client
      .delete<DeleteShiftResponse>(
        `/attendance/shifts/${deleteShiftRequest.shiftId}`,
      )
      .then((response) => response.data);
