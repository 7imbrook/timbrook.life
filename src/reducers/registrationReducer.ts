export interface RegistrationState {
    pending?: boolean;
    errors?: string[];
    redirect?: string;
}

export const registrationReducer = (state: RegistrationState, action: any): RegistrationState => {
    if (state === undefined) return {};
    switch (action.type) {
        case 'register_failure':
            return {
                pending: false,
                errors: action.errors
            };
        case 'register_request':
            return {
                pending: true
            };
        case 'register_success':
            return {
                pending: false
            };
        default:
            return state;
    }
};