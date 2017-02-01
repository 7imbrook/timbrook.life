import 'whatwg-fetch';
import { remoteFetch } from '../utils';
import { State } from '../reducers';
import { resetAuth } from '../store/authPersistance';

interface TokenPayload {
    token: string;
}

export function requestFreshAuthToken(code: string) {
    return (dispatch:  any, getState: () => State) => {
        const user = getState().session.username;
        if (user === undefined) {
            return;
        }

        // TODO: don't let my cert expire and then get rate limited.
        remoteFetch('https://auth.timbrook.life/', {
            method: 'POST',
            // TODO: use map -> encoded
            body: 'username=' + encodeURIComponent(user) + '&code=' + code
        })
        .then((token: TokenPayload) => {
            return dispatch(updateAuthToken(token.token));
        })
        .catch((err: Error) => {
            resetAuth();
            return dispatch(refreshError(err));
        });
        return dispatch({
            type: 'requesting_auth_token'
        });
    };
}

function refreshError(error: Error): any {
    return (dispatch: any) => {
        console.log(error.message);
        dispatch({
            type: 'refresh_error',
            error
        });
    };
}

function updateAuthToken(token: string) {
    if (token !== undefined) {
        return (dispatch: any) => dispatch({
            type: 'set_auth_token',
            token
        });
    }
    return;
}
