export interface CashFlowItem {
    date: string;
    gracePeriod: string;
    initialBalance: number;
    interest: number;
    amortization: number;
    finalBalance: number;
    quota: number;
    bondholderFlow: number;
    updatedFlow: number;
    flowByTerm: number;
    convexityFactor: number;
}