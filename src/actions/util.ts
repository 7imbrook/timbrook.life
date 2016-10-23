import 'whatwg-fetch';

export function errorCheck(response: Response): any {
    if (response.status >= 200 && response.status < 400) {
        return response.json();
    }
    switch (response.status) {
        case 400:
            throw new Error('Bad Request');
        case 409:
            throw new Error('Conflict');
        case 401:
            throw new Error('Unauthorized');
        case 500:
            throw new Error('The server failed to respond');
        default:
            return new Error('Unknown error');
    }
}

let pending: boolean = false;
let execution: () => void = () => {};
export function throttle(fn: () => void, threshhold: number) {
    execution = fn;
    if (!pending) {
        pending = true;
        setTimeout(() => {
            execution();
            pending = false;
        }, threshhold);
    }
}
