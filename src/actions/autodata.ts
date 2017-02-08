import 'whatwg-fetch';
import { simpleFetch } from '../utils';
import { State } from '../reducers';

interface PostgrestOptions extends JSON {
    columns: Column[];
}

interface Referance {
    schema: string;
    column: string;
    table: string;
}

interface Column extends JSON {
    references: Referance | null;
    default: string | null;
    precision: number | null;
    updatable: boolean;
    schema: string;
    name: string;
    type: string;
    maxLen: number | null;
    enum: string[];
    nullable: boolean;
    position: number;
}

export function formSpecForURL(url: string) {
    return (dispatch: any) => {
        dispatch({
            type: 'form_spec_request',
            url
        });
        return simpleFetch(url, {
            method: 'OPTIONS'
        })
        .then((res: PostgrestOptions) => {
            return res.columns.map((col: Column) => {
                switch (col.type) {
                    // ORDER Matters here for fallback types
                    case 'text':
                    case 'character varying':
                    case 'money':
                        col.type = 'text';
                        break;
                    case 'boolean':
                        break;
                    case 'numeric':
                    case 'integer':
                        col.type = 'numeric';
                        break;
                }
                if (col.references !== null) {
                    return simpleFetch('/api/' + col.references.table)
                        .then((val: any[]) => {
                            return val.map((k: any) => {
                                if (col.references !== null) {
                                    return k[col.references.column] as string;
                                } else {
                                    return undefined;
                                }
                            });
                        })
                        .then((refValues: string[]) => {
                            return { name: col.name, type: 'select', refValues };
                        });
                } else {
                    return new Promise((acc) => acc({ name: col.name, type: col.type }));
                }
            });
        })
        .then((proms: Promise<any>[]) => {
            return Promise.all(proms);
        })
        .then((spec: any) => {
            dispatch({
                type: 'form_spec_fullfilled',
                payload: {
                    [url]: spec
                }
            });
        });
    };
};

export function submitURLGeneric(url: string, payload: any) {
    return (_dispatch: any, getState: () => State) => {
        return simpleFetch(url, {
            method: 'POST',
            body: JSON.stringify(payload),
        }, getState().session);
    };
};