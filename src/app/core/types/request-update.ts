import { RequestCategory } from "./request-category";

export class requestUpdate{
    requestId: number;
    datetime: string;
    currentStatus: RequestCategory;
    nextStatus: RequestCategory;
    inChargeEmployeeId!: number;
    senderEmployeeId!: number;
    rejectionReason!: string;
    budget!: number;
    repairDesc!: string;
    customerOrientations!: string;
    userType!: string;

    constructor(requestId: number, currentStatus: RequestCategory, nextStatus: RequestCategory, datetime: number){
        this.requestId = requestId;
        this.currentStatus = currentStatus;
        this.nextStatus = nextStatus;
        const brTimezoneOffset = -3 * 60;
        const localDatetime = new Date(datetime);
        localDatetime.setMinutes(localDatetime.getMinutes() + brTimezoneOffset);
        this.datetime = localDatetime.toISOString();
    }
}