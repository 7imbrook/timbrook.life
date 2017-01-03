import 'whatwg-fetch';
// import { errorCheck, throttle } from './util';
import { State } from '../reducers';

interface TokenPayload extends Response {
    token: string;
}

export function refreshAuthToken() {
    return (dispatch:  any, _getStore: () => State) => {
        fetch('https://auth.timbrook.life/', {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            body: 'username=timbrook'
        })
        .then((res: Response) => {
            return res.json();
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