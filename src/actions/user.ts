import 'whatwg-fetch';
import { push } from 'react-router-redux';
import { errorCheck } from './util';

export interface LoginActionPending {
    type: 'login_request';
}

export interface LoginActionSuccess {
    type: 'login';
}

export interface LoginActionFailure {
    type: 'login_failure';
    error: string;
}

export interface RegisterFailure {
    type: 'register_failure';
    errors: string[];
}

export interface RegisterSuccess {
    type: 'register_success';
}

interface LoginCheckResponse {
    logged_in: boolean;
}

interface RegisterResponse {
    errors: string[];
}

export function loginCheck(): any {
    return (dispatch: any) => {
        fetch('/api/auth/signed_in', {
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((_body: LoginCheckResponse) => {
            dispatch(loginSuccess());
        })
        .catch(() => {
            dispatch({
                type: 'login_failure',
                errors: []
            });
        });

        return dispatch({
            type: 'login_request'
        });
    };
}

export function login(email: string, password: string): any {
    return (dispatch: any) => {
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                email, password
            })
        })
        .then(errorCheck)
        .then((_res: LoginCheckResponse) => {
            dispatch(loginSuccess());
        })
        .catch((err: Error) => {
            dispatch(loginFailure(err.message));
        });

        return dispatch({
            type: 'login_request'
        });
    };
}

export function loginSuccess(): LoginActionSuccess {
    return {
        type: 'login'
    };
}

export function loginFailure(error: string): LoginActionFailure {
    return {
        type: 'login_failure',
        error
    };
}

export function registerFailure(errors: string[]): RegisterFailure {
    return {
        type: 'register_failure',
        errors
    };
}

export function registerSuccess(): RegisterSuccess {
    return {
        type: 'register_success'
    };
}


export function register(name: string, password: string, email: string, birthday: string): any {
    return (dispatch: any) => {
        const bvalue = birthday.split('/');
        const bday = new Date(
            parseInt(bvalue[2]),
            parseInt(bvalue[1]),
            parseInt(bvalue[0])
        );
        fetch('/api/user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    name, email, password, birthday: bday.toISOString()
                }
            })
        })
        .then(errorCheck)
        .then((_res: RegisterResponse) => {
            dispatch(registerSuccess());
            dispatch(login(email, password));
            dispatch(push('/'));
        })
        .catch((error: Error) => {
            dispatch(registerFailure([error.message]));
        });

        return dispatch({
            type: 'register_request'
        });
    };
}


