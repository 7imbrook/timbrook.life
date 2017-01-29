export interface AutoFormState {
    loading: boolean;
    [url: string]: {};
}

export const autoFormReducer = (state: AutoFormState, action: any): AutoFormState => {
    if (state === undefined) return { loading: false };
    switch (action.type) {
        case 'form_spec_fullfilled':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};
