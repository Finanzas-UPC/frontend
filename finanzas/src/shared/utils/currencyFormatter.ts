export const formatCurrency = (amount: number, currency: string): string => {
    switch (currency) {
        case 'USD':
            return `$ ${amount}`;
        case 'EUR':
            return `€ ${amount}`;
        case 'PEN':
            return `S/. ${amount}`;
        default:
            return amount.toString();
    }
};