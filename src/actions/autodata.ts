import 'whatwg-fetch';
import { remoteFetch } from '../utils';

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
        return remoteFetch(url, {
            method: 'OPTIONS'
        })
        .then((res: PostgrestOptions) => {
            return res.columns.map((col: Column) => {
                switch (col.type) {
                    case 'boolean':
                    case 'text':
                    case 'character varying':
                    default:
                        if (col.references !== null) {
                            return remoteFetch('/api/' + col.references.table)
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
