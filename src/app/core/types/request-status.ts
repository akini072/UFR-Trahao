import { RequestCategory } from "./request-category";
import { Request } from "./request";
import { Employee } from "./employee";

export interface RequestStatus {
  requestStatusId: String;
  dateTime: Date;
  category: RequestCategory
  senderEmployee: Employee | null;
  inChargeEmployee: Employee | null;
  request: Request;
  requestId?: number;
}
