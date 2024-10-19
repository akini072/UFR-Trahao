export interface MonthlyReportItem {
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
}

export interface MonthlyReport {
    items: MonthlyReportItem[];
}