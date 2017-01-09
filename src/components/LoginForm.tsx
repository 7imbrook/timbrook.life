import * as React from 'react';
import BindingComponent from './util/BindingComponent';

import {
    RaisedButton,
    TextField,
    CircularProgress,
    Paper
} from 'material-ui';

export interface LoginProps {
    onSubmit?: (u: String) => void;
    lock?: boolean;
    error?: Error;
}

export class LoginForm extends BindingComponent<LoginProps> {
    constructor(_: LoginProps) {
        super();
        this.state = {
            username: ''
        };
    }

    render() {
        const buttons = <div>
            <RaisedButton type='submit' style={{marginTop: '20px'}} label='Login' />
        </div>;

        const spinner = <div>
            <br />
            <CircularProgress />
        </div>;

        const style = {
            margin: '0 auto',
            padding: '40px',
            display: 'block',
            maxWidth: '350px',
            textAlign: 'center'
        };

        const errText = this.props.error !== undefined ? this.props.error.message : undefined;

        return (
            <Paper style={style}>
                <form onSubmit={this.submit.bind(this)}>
                    <TextField hintText='Username' name='username'
                                errorText={errText}
                                value={this.state['username']}
                                onChange={this.bindValueToName.bind(this)}
                                disabled={this.props.lock} />
                    <br />
                    {this.props.lock ? spinner : buttons}
                </form>
            </Paper>
        );
    }

    submit(ev: Event) {
        const username = this.state['username'];
        if (this.props.onSubmit !== undefined) {
            this.props.onSubmit(username);
        }
        ev.preventDefault();
        return false;
    }
}
export default LoginForm;