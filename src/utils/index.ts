import 'whatwg-fetch';

export function remoteFetch(url: string, options?: RequestInit) {
    return fetch(url, Object.assign({}, options || {}, {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    }))
    .then(errorCheck);
}

export function simpleFetch(url: string, options?: RequestInit) {
    return fetch(url, Object.assign({}, options || {}, {
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        }
    }))
    .then(errorCheck);
}

export function errorCheck(response: Response): any {
    if (response.status >= 200 && response.status < 400) {
        // Content created has no body
        if (response.status === 201 || response.status === 204) {
            return undefined;
        }
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

// TODO: THIS IS SHIT
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
