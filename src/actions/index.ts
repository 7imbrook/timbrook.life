import 'whatwg-fetch';
import { loadTasks } from './tasks';
import { refreshAuthToken } from './auth';

export function init() {
    return (dispatch: any) => {
        // Auth check
        dispatch(refreshAuthToken());

        // Auto refresh
        setInterval(() => {
            if (!document.hidden) {
                dispatch(loadTasks());
            }
        }, 60000);
    };
};
