import 'whatwg-fetch';
import { remoteFetch } from '../utils';
import { State } from '../reducers';

interface TokenPayload {
    token: string;
}

export function refreshAuthToken() {
    return (dispatch:  any, _getStore: () => State) => {
        remoteFetch('https://auth.timbrook.life/', {
            method: 'POST',
            body: 'username=timbrook'
        })
        .then((token: TokenPayload) => {
            return dispatch(updateAuthToken(token.token));
        });
    };
}

function updateAuthToken(token: string) {
    return (dispatch: any) => dispatch({
        type: 'set_auth_token',
        token
    });
}
