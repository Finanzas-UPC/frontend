export interface Bond {
    id?: number;
    userId: number;
    name: string;
    amount: number;
    marketValue: number;
    duration: number;
    frequency: number;
    interestType: string;
    interestRate: number;
    capitalization: number;
    marketRate: number;
    emissionDate: string;
    gracePeriodType: string;
    gracePeriodDuration: number;
}
