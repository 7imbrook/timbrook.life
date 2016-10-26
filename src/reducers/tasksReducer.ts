export interface Task {
    name: string;
    done: boolean;
}

export interface TasksState {
    loading: boolean;
    tasks: Task[];
}

export const tasksReducer = (state: TasksState, action: any): TasksState => {
    if (state === undefined) {
        return {
            loading: false,
            tasks: []
        };
    }
    switch (action.type) {
        case 'load_all_tasks':
            return {
                loading: false,
                tasks: action.tasks
            };
        case 'tasks_request':
            return {
                loading: true,
                tasks: []
            };
        default:
            return state;
    }
};