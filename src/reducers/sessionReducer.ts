export interface SessionState {
    token?: string;
    isLoggedIn: boolean;
    pending?: boolean;
    error?: string;
}

export const sessionReducer = (state: SessionState, action: any): SessionState => {
    if (state === undefined) return {isLoggedIn: false};
    switch (action.type) {
        case 'requesting_auth_token':
            return Object.assign({}, state, {
                pending: true
            });
        case 'set_auth_token':
            return Object.assign({}, state, {
                token: action.token,
                isLoggedIn: true,
                pending: false
            });
        default:
            return state;
    }
};