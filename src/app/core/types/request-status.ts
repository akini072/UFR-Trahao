import { RequestCategory } from "./request-category";
import { Request } from "./request";

export interface RequestStatus {
  requestStatusId: String;
  dateTime: Date;
  category: RequestCategory
  senderEmployee: String;
  senderEmployeeId?: number;
  inChargeEmployee: String;
  inChargeEmployeeId?: number;
  request: Request;
  requestId?: number;
}
