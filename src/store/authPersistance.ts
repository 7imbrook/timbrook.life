import {
    Store
} from 'redux';
import {
    State
} from '../reducers';
import {
    SessionState
} from '../reducers/sessionReducer';
import {
    Base64
} from 'js-base64';

interface JWTPayload {
    role: string;
    exp: number;
}

const STORE_KEY = 'authtoken';

function decode(token: string): string | null {
    try {
        const body = JSON.parse(
            Base64.decode(token.split('.')[1])
        ) as JWTPayload;
        if (body.exp > (Date.now() / 1000)) {
            return token;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export function loadState(): SessionState | undefined {
    const token = window.localStorage.getItem(STORE_KEY);
    const payload = token !== null ? decode(token) : null;
    if (token !== null && payload !== null) {
        return {
            isLoggedIn: true,
            pending: false,
            token
        };
    } else {
        window.localStorage.removeItem(STORE_KEY);
        return undefined;
    }
}

export function registerStore(store: Store<{}>) {
    store.subscribe(() => {
        const state: State = store.getState() as State;
        saveState(state.session);
    });
}

function saveState(state: SessionState): void {
    if (state.token !== undefined) {
        window.localStorage.setItem(STORE_KEY, state.token);
    }
}
