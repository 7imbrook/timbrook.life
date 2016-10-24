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
            }]
        };
    }
    switch (action.type) {

        default:
            return state;
    }
};