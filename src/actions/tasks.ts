import 'whatwg-fetch';
import {
    throttle,
    simpleFetch
 } from '../utils';
import { State } from '../reducers';

interface CategoryRes {
    name: string;
}

export function deleteTask(id: string) {
    return (dispatch: any, getState: () => State) => {
        simpleFetch('/api/tasks?id=eq.' + id, {
            method: 'DELETE'
        }, getState().session)
        .then((_res: Response) => {
            dispatch(loadTasks());
        });
    };
}

export function addTask(name: string, category: string) {
    return (dispatch: any, getState: () => State) => {
        simpleFetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify({ name, category })
        }, getState().session)
        .then((_res: Response) => {
            dispatch(loadTasks());
        });
    };
}

export function loadTasks(): any {
    return (dispatch: any) => {
        const tasksp: Promise<JSON> = simpleFetch('/api/tasks?done=eq.false');
        const categoriesp: Promise<CategoryRes[]> = simpleFetch('/api/categories');

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
    return (dispatch: any) => {
        dispatch({ type: 'remove_task_from_complete', id});
    };
}

export function addTaskToCompletion(id: string) {
    return (dispatch: any, getState: () => State) => {
        dispatch({
            type: 'add_task_to_complete',
            id,
        });
        throttle(() => {
            const tasks = getState().requests.pendingCompletion;
            const query = 'id=in.' + tasks.join(',');
            if (query === 'id=in.') {
                return;
            }
            simpleFetch('/api/tasks?' + query, {
                method: 'PATCH',
                body: JSON.stringify({ done: true })
            }, getState().session)
            .then(() => {
                tasks.forEach(id => dispatch({
                    type: 'complete_taskid_local',
                    id,
                }));
                dispatch({
                    type: 'clear_pending_completion'
                });
            });
        }, 5000);
    };
}

