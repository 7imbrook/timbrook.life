import 'whatwg-fetch';
import { loadTasks } from './tasks';
// import { requestFreshAuthToken } from './auth';

export function init() {
    return (dispatch: any) => {
        // Auth check, TODO, use refresh
        // dispatch(requestFreshAuthToken());

        // Auto refresh
        setInterval(() => {
            if (!document.hidden) {
                dispatch(loadTasks());
            }
        }, 60000);
    };
};
