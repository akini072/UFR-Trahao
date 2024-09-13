export type RequestStatus = 'pending' | 'approved' | 'rejected' | 'paid' | "canceled" |  undefined;

export interface Request {
    id: number;
    title: string;
    description: string;
    status: RequestStatus;
    created_at: string;
}