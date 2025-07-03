export const getFrequencyLabel = (freq: number): string => {
    const map: Record<number, string> = {
        1: 'Anual',
        2: 'Semestral',
        3: 'Cuatrimestral',
        4: 'Trimestral',
        6: 'Bimestral',
        12: 'Mensual',
        24: 'Quincenal',
        52: 'Semanal',
        360: 'Diaria'
    };
    return map[freq] ?? 'Mensual';
}

export const getFrequencyValue = (label: string): number => {
    const map: Record<string, number> = {
        'Anual': 1,
        'Semestral': 2,
        'Cuatrimestral': 3,
        'Trimestral': 4,
        'Bimestral': 6,
        'Mensual': 12,
        'Quincenal': 24,
        'Semanal': 52,
        'Diaria': 360
    };
    return map[label] ?? 12;
};