export interface Bond {
    id?: number;
    userId: number;
    name: string;
    nominalValue: number;
    marketValue: number;
    duration: number;
    frequency: number;
    interestType: string;
    interestRate: number;
    capitalization: number;
    discountRate: number;
    emissionDate: string;
    gracePeriodType: string;
    gracePeriodDuration: number;
    currency: string;
    // Bond Expenses
    primeRate: number;
    structuringRate: number;
    placementRate: number;
    floatRate: number;
    cavaliRate: number;
}
