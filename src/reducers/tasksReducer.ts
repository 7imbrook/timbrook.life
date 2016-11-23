export interface Task {
    id: string;
    name: string;
    done: boolean;
    category: string;
}

export interface TasksState {
    loading: boolean;
    tasks: Task[];
    catigories: string[];
}

export const tasksReducer = (state: TasksState, action: any): TasksState => {
    if (state === undefined) {
        return {
            loading: false,
            tasks: [],
            catigories: []
        };
    }
    switch (action.type) {
        case 'complete_taskid_local':
            return {
                loading: false,
                tasks: state.tasks.filter(task => task.id !== action.id),
                catigories: state.catigories
            };
        case 'load_all_tasks':
            return {
                loading: false,
                tasks: action.tasks,
                catigories: state.catigories
            };
        case 'tasks_request':
            return {
                loading: true,
                tasks: state.tasks,
                catigories: state.catigories
            };
        case 'set_catigories':
            return {
                loading: false,
                tasks: state.tasks,
                catigories: action.catigories
            };
        default:
            return state;
    }
};