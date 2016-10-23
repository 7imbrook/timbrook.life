export interface SessionState {
    isLoggedIn: boolean;
    pending?: boolean;
    error?: string;
}

export const sessionReducer = (state: SessionState, action: any): SessionState => {
    if (state === undefined) return {isLoggedIn: false};
    switch (action.type) {
        case 'login':
            return {
                pending: false,
                isLoggedIn: true,
            };
        case 'login_request':
            return {
                pending: true,
                isLoggedIn: state.isLoggedIn
            };
        case 'login_failure':
            return {
                pending: false,
                isLoggedIn: false,
                error: action.error
            };
        default:
            return state;
    }
};