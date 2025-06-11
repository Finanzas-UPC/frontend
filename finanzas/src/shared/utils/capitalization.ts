export const getCapitalizationLabel = (days: number): string => {
    const map: Record<number, string> = {
        1: 'Diaria',
        15: 'Quincenal',
        30: 'Mensual',
        60: 'Bimestral',
        90: 'Trimestral',
        120: 'Cuatrimestral',
        180: 'Semestral',
        360: 'Anual',
        0: 'No aplica'
    };
    return map[days] ?? 'Mensual';
};

export const getCapitalizationDays = (label: string): number => {
    const map: Record<string, number> = {
        'Diaria': 1,
        'Quincenal': 15,
        'Mensual': 30,
        'Bimestral': 60,
        'Trimestral': 90,
        'Cuatrimestral': 120,
        'Semestral': 180,
        'Anual': 360,
        'No aplica': 0
    };
    return map[label] ?? 30;
};
