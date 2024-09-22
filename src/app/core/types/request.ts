export type RequestCategory = 'open' | 'budjeted' | 'rejected' | 'approved' | 'redirected' | 'fixed' | 'paid' | "finalized";

export interface Request {
    id: number;
    title: string;
    description: string;
    status: RequestCategory;
    created_at: string;
    image: string;
}
