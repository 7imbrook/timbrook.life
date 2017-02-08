import * as React from 'react';
import { AutoFormSpec, FormType } from '../reducers/autoFormsReducer';
import {
    TextField,
    SelectField,
    MenuItem,
    Checkbox,
    RaisedButton
} from 'material-ui';

export interface AutoFormProps {
    inputs?: AutoFormSpec[];
    excludes?: string[];
    onChange?: (payload: any) => void;
    onLoad?: () => void;
}

interface AutoFormState {
    [name: string]: any;
}

class AutoForm extends React.Component<AutoFormProps, AutoFormState> {

    constructor(props: AutoFormProps) {
        super(props);
        this.state = { };
    }

    componentWillMount() {
        if (this.props.onLoad !== undefined) {
            this.props.onLoad();
        }
    }

    _handleFieldChange(spec: AutoFormSpec, change: any) {
        this.setState({
            [spec.name]: change
        });
    }

    _elementForType(type: FormType, spec: AutoFormSpec): JSX.Element | undefined {
        switch (type) {
            case 'boolean':
                return <Checkbox
                    label={spec.name}
                    value={this.state[spec.name]}
                    onCheck={(_:any, checked: boolean) => this._handleFieldChange(spec, checked)}
                />;
            case 'text':
            case 'numeric':
                return <TextField
                    value={this.state[spec.name] || ''}
                    floatingLabelText={spec.name}
                    name={spec.name}
                    onChange={ (val: any) => this._handleFieldChange(spec, val.target.value) }
                />;
            case 'select':
                return <SelectField
                        value={this.state[spec.name]}
                        floatingLabelText={spec.name}
                        onChange={ (_e: any, _k: number, value: string) => this._handleFieldChange(spec, value) }
                    >
                        {spec.refValues!.map((val: string) => <MenuItem primaryText={val} value={val} key={val} />)}
                    </SelectField>;
            default:
                return undefined;
        }
    }

    render() {
        const input_list = (this.props.inputs || [])
        .filter((thing: AutoFormSpec) => {
            if (this.props.excludes !== undefined) {
                return this.props.excludes.indexOf(thing.name) === -1;
            } else return true;
        })
        .map((thing: AutoFormSpec) => {
            return (<div key={thing.name}>
                {this._elementForType(thing.type, thing)}
            </div>);
        });

        return (
            <div>
                {input_list}
                <RaisedButton
                    label={'Triggerize'}
                    onClick={() => this.props.onChange!(this.state) }/>
            </div>
        );
    }
};

export default AutoForm;
