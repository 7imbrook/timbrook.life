import 'whatwg-fetch';
import { errorCheck, throttle } from './util';
import { State } from '../reducers';

interface CategoryRes {
    name: string;
}

export function deleteTask(id: string) {
    return (dispatch: any) => {
        fetch('/api/tasks?id=eq.' + id, {
            credentials: 'same-origin',
            method: 'DELETE'
        })
        .then((_res: Response) => {
            dispatch(loadTasks());
        });
    };
}

export function addTask(name: string, category: string) {
    return (dispatch: any) => {
        fetch('/api/tasks', {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, category })
        })
        .then((_res: Response) => {
            dispatch(loadTasks());
        });
    };
}

export function loadTasks(): any {
    return (dispatch: any) => {
        const tasksp: Promise<JSON> = fetch('/api/tasks?done=eq.false', {
            credentials: 'same-origin'
        })
        .then(errorCheck);

        const categoriesp: Promise<CategoryRes[]> = fetch('/api/categories', {
            credentials: 'same-origin'
        })
        .then(errorCheck);

        Promise.all([tasksp, categoriesp])
        .then((all: any[]) => {
            const catigories: CategoryRes[] = all[1];
            dispatch({
                type: 'set_catigories',
                catigories: catigories.map(c => c.name)
            });
            dispatch({
                type: 'load_all_tasks',
                tasks: all[0]
            });
        });

        return dispatch({
            type: 'tasks_request'
        });
    };
}

export function removeTaskFromCompletion(id: string) {
    return (dispatch: any, getState: () => State) => {
        const state = getState();
        if (state.requests.pendingCompletion.indexOf(id) > 0) {
            dispatch({ type: 'remove_task_from_complete', id});
        }
    };
}

export function addTaskToCompletion(id: string) {
    return (dispatch: any, getState: () => State) => {
        setTimeout(() => dispatch({
            type: 'complete_taskid_local',
            id,
        }), 3000);
        dispatch({
            type: 'add_task_to_complete',
            id,
        });
        throttle(() => {
            const query = 'id=in.' + getState().requests.pendingCompletion.join(',');
            fetch('/api/tasks?' + query, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ done: true })
            })
            .then(() => {
                dispatch({
                    type: 'clear_pending_completion'
                });
            });
        }, 5000);
    };
}

