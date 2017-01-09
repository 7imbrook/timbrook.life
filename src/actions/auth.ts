import 'whatwg-fetch';
import { remoteFetch } from '../utils';
import { State } from '../reducers';

interface TokenPayload {
    token: string;
}

export function requestFreshAuthToken(code: string) {
    return (dispatch:  any, getState: () => State) => {
        const user = getState().session.username;
        if (user === undefined) {
            return;
        }
        remoteFetch('http://localhost:3000/', {
            method: 'POST',
            // TODO: use map -> encoded
            body: 'username=' + encodeURIComponent(user) + '&code=' + code
        })
        .then((token: TokenPayload) => {
            return dispatch(updateAuthToken(token.token));
        })
        .catch((err: Error) => {
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
