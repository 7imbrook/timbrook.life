export interface SessionState {
    username?: string;
    token?: string;
    isLoggedIn: boolean;
    pending: boolean;
    error?: Error;
}

export const sessionReducer = (state: SessionState, action: any): SessionState => {
    if (state === undefined) return { isLoggedIn: false, pending: false };
    switch (action.type) {
        case 'requesting_auth_token':
            return Object.assign({}, state, {
                pending: true
            });
        case 'set_active_user':
            return Object.assign({}, state, {
                username: action.username
            });
        case 'set_auth_token':
            return Object.assign({}, state, {
                token: action.token,
                isLoggedIn: true,
                pending: false
            });
        case 'refresh_error':
            // Reset everything
            return {
                isLoggedIn: false,
                error: action.error,
                pending: false
            };
        default:
            return state;
    }
};