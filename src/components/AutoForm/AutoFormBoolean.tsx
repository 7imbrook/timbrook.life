import * as React from 'react';

export interface AutoFormBooleanProps {
    label: string;
}

const AutoFormBoolean = (props: AutoFormBooleanProps) => {
    return (<div>
        {props.label}
        <br />
    </div>);
};

export default AutoFormBoolean;
