import { type ActionContext, createStore } from "vuex";

interface State {
    token: string | null;
    userId: string | null;
    isAuthenticated: boolean;
    currency: string;
    interestRateType: string;
    capitalization: number;
    isBondIssuer: boolean;
}

const CAPITALIZATION_MAP: Record<string, number> = {
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

export default createStore<State>({
    state: {
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
        isAuthenticated: !!localStorage.getItem('token'),
        currency: localStorage.getItem('currency') ?? 'PEN',
        interestRateType: localStorage.getItem('interestRateType') ?? 'Nominal',
        capitalization: parseInt(localStorage.getItem('capitalization') ?? '30'),
        isBondIssuer: localStorage.getItem('isBondIssuer') === 'true'
    },
    mutations: {
        setToken(state: State, token: string | null) {
            state.token = token;
            state.isAuthenticated = !!token;
            token
                ? localStorage.setItem('token', token)
                : localStorage.removeItem('token');
        },
        setUserId(state: State, userId: string | null) {
            state.userId = userId;
            userId
                ? localStorage.setItem('userId', userId)
                : localStorage.removeItem('userId');
        },
        setCurrency(state: State, currency: string | null) {
            const value = currency ?? 'PEN';
            state.currency = value;
            localStorage.setItem('currency', value);
        },
        setInterestRateType(state: State, rateType: string | null) {
            const value = rateType ?? 'Nominal';
            state.interestRateType = value;
            localStorage.setItem('interestRateType', value);
        },
        setCapitalization(state: State, cap: string | null) {
            const validCap = cap ?? 'Mensual';
            const days = CAPITALIZATION_MAP[validCap] ?? 30;
            state.capitalization = days;
            localStorage.setItem('capitalization', days.toString());
        },
        setIsBondIssuer(state: State, isBondIssuer: boolean) {
            state.isBondIssuer = isBondIssuer;
            localStorage.setItem('isBondIssuer', String(isBondIssuer));
        }
    },
    actions: {
        login({ commit }: ActionContext<State, State>, payload: { token: string; userId: string }) {
            commit('setToken', payload.token);
            commit('setUserId', payload.userId);
        },
        logout({ commit }: ActionContext<State, State>) {
            commit('setToken', null);
            commit('setUserId', null);
            commit('setCurrency', null);
            commit('setInterestRateType', null);
            commit('setCapitalization', null);
            commit('setIsBondIssuer', null);
        },
        updateCurrency({ commit }: ActionContext<State, State>, currency: string) {
            commit('setCurrency', currency);
        },
        updateInterestRateType({ commit }: ActionContext<State, State>, rateType: string) {
            commit('setInterestRateType', rateType);
        },
        updateCapitalization({ commit }: ActionContext<State, State>, cap: string) {
            commit('setCapitalization', cap);
        },
    },
    getters: {
        isAuthenticated(state: State): boolean {
            return state.isAuthenticated;
        },
        getToken(state: State): string | null {
            return state.token;
        },
        getUserId(state: State): string | null {
            return state.userId;
        },
        getCurrency(state: State): string {
            return state.currency;
        },
        getInterestRateType(state: State): string {
            return state.interestRateType;
        },
        getCapitalization(state: State): number {
            return state.capitalization;
        },
        getIsBondIssuer(state: State): boolean {
            return state.isBondIssuer;
        }
    },
});
