export interface CashFlowItem {
    id: number;
    bondId: number; // Referencia al bono (solo el ID, ya que no se representa como objeto aquí)

    // Información del flujo de caja
    period: number;
    paymentDate: string; // Usar ISO string para fechas
    isGracePeriod: boolean;
    initialBalance: number;
    interest: number;
    amortization: number;
    finalBalance: number;
    totalPayment: number;

    // Valores para métricas
    issuerCashFlow: number;
    bondHolderCashFlow: number;
    discountedFlow: number;
    discountedFlowTimesPeriod: number;
    convexityFactor: number;
}