export interface RequestsState {
    pendingCompletion: string[];
}

export const requestsReducer = (state: RequestsState, action: any): RequestsState => {
    if (state === undefined) return { pendingCompletion: [] };
    switch (action.type) {
        case 'add_task_to_complete':
            state.pendingCompletion.push(action.id as string);
            return {
                pendingCompletion:  state.pendingCompletion
            };
        case 'clear_pending_completion':
            return {
                pendingCompletion: []
            };
        default:
            return state;
    }
};
