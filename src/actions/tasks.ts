import 'whatwg-fetch';
import { errorCheck } from './util';

interface CategoryRes {
    name: string;
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



