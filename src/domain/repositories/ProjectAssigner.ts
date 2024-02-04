import { ShiftId } from "../models/ShiftId.js";
import { ProjectId } from "../models/ProjectId.js";

export interface ProjectAssigner {
  assign(shiftId: ShiftId, projectId: ProjectId): Promise<void>;
}
