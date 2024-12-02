import { EquipCategory } from './equip-category';
import { RequestStatus } from "./request-status";

export interface Request {
    requestId: number;
    customerId: number;
    equipmentDesc: string;
    defectDesc: string;
    status: RequestStatus[];
    budget: number;
    repairDesc: string;
    customerOrientations: string;
    image: string;
    equipCategory: EquipCategory;
}
