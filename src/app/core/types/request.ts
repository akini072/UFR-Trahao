import { RequestStatus } from "./request-status";

export interface Request {
    requestId: number;
    requestDesc: string;
    equipmentDesc: string;
    defectDesc: string;
    status: RequestStatus[];
    budget: number;
    repairDesc: string;
    customerOrientations: string;
    image: string;
}
