export interface AutoFormSpec {
    name: string;
    type: FormType;
    refValues?: string[];
}

export interface AutoFormState {
    [url: string]: AutoFormSpec[];
}

export type FormType = 'boolean' | 'text' | 'select';

export const autoFormReducer = (state: AutoFormState, action: any): AutoFormState => {
    if (state === undefined) return { };
    switch (action.type) {
        case 'form_spec_fullfilled':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};
