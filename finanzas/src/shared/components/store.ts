import { type ActionContext, createStore } from "vuex";

interface State {
    token: string | null;
    userId: string | null;
    isAuthenticated: boolean;
    currency: string;
}

export default createStore<State>({
    state: {
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId'),
        isAuthenticated: !!localStorage.getItem('token'),
        currency: localStorage.getItem('currency') || 'PEN',
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
        setCurrency(state: State, currency: string) {
            state.currency = currency;
            localStorage.setItem('currency', currency);
        },
    },
    actions: {
        login(
            { commit }: ActionContext<State, State>,
            payload: { token: string; userId: string }
        ) {
            commit('setToken', payload.token);
            commit('setUserId', payload.userId);
        },
        logout({ commit }: ActionContext<State, State>) {
            commit('setToken', null);
            commit('setUserId', null);
        },
        updateCurrency(
            { commit }: ActionContext<State, State>,
            currency: string
        ) {
            commit('setCurrency', currency);
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
    },
});