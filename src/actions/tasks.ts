import 'whatwg-fetch';
import { errorCheck } from './util';

export function loadTasks(): any {
    return (dispatch: any) => {
        fetch('/api/tasks?done=eq.false', {
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((t: JSON) => {
            dispatch({
                type: 'load_all_tasks',
                tasks: t
            });
        });

        return dispatch({
            type: 'tasks_request'
        });
    };
}



