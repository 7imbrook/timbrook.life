import * as React from 'react';
import AutoFormBoolean from './AutoForm/AutoFormBoolean';

export interface AutoFormProps {
    inputs?: any;
}

interface AutoFormState {
}

interface FormSpec {
    name: string;
};

const centering = {
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '90%'
};

class AutoForm extends React.Component<AutoFormProps, AutoFormState> {

    constructor(props: AutoFormProps) {
        super(props);
        this.state = { };
    }

    render() {
        const input_list = (this.props.inputs || []).map((thing: FormSpec) => {
            return (<div key={thing.name} style={{display: 'block'}}>
                <AutoFormBoolean label={thing.name}/>
            </div>);
        });

        return (
            <div style={centering}>
                {input_list}
            </div>
        );
    }
};

export default AutoForm;
