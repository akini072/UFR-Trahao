import { Customer } from './customer';
import { EquipCategory } from './equip-category';
import { RequestStatus } from "./request-status";

export interface Request {
    requestId: number;
    customer: Customer;
    equipmentDesc: string;
    defectDesc: string;
    status: RequestStatus[];
    budget: number;
    rejectReason?: string;
    repairDesc: string;
    customerOrientations: string;
    image: string;
    equipCategory: EquipCategory;
}
