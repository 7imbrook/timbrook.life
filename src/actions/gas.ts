import 'whatwg-fetch';
import {
    simpleFetch
 } from '../utils';

export function fetchRecentFillups(_count = 10) {
    return (dispatch: any) => {
        simpleFetch('/api/gaslog')
            .then((entries: JSON) => {
                dispatch({
                    type: 'save_gas_local',
                    entries
                });
            });
    };
}

export function addFill(fill: any) {
    return (dispatch: any) => {
        dispatch({
            type: 'add_fill_local',
            fill
        });
    };
}