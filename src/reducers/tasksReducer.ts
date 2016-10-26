export interface Task {
    name: string;
    done: boolean;
}

export interface TasksState {
    tasks: Task[];
}

export const tasksReducer = (state: TasksState, action: any): TasksState => {
    if (state === undefined) {
        return {
            tasks: [{
                name: 'There is stuff in here',
                done: false
            },
            {
                name: 'say hi joe',
                done: false
            }]
        };
    }
    switch (action.type) {
        case 'load_all_tasks':
            return {
                tasks: action.tasks
            };
        default:
            return state;
    }
};