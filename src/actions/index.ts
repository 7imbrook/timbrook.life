import 'whatwg-fetch';
import { loadTasks } from './tasks';

export function init() {
    return (dispatch: any) => {
        setInterval(() => {
            if (!document.hidden) {
                dispatch(loadTasks());
            }
        }, 60000);
    };
};
