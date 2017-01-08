import * as React from 'react';
import BindingComponent from './util/BindingComponent';

import {
    RaisedButton,
    TextField,
    CircularProgress,
    Paper
} from 'material-ui';

export interface LoginProps {
    onSubmit?: (u: String, p: String) => void;
    lock?: boolean;
    error?: string;
}

export class LoginForm extends BindingComponent<LoginProps> {
    constructor(_: LoginProps) {
        super();
        this.state = {
            email: '',
            password: ''
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

        return (
            <Paper style={style}>
                <form onSubmit={this.submit.bind(this)}>
                    <TextField hintText='email' name='email'
                                value={this.state['email']}
                                onChange={this.bindValueToName.bind(this)}
                                disabled={this.props.lock} />
                    <br />
                    <TextField hintText='Password' name='password'
                                type='password' value={this.state['password']}
                                onChange={this.bindValueToName.bind(this)}
                                disabled={this.props.lock} />
                    <br />
                    <div style={{
                        color: 'red'
                    }}>
                        {this.props.error}
                    </div>
                    {this.props.lock ? spinner : buttons}
                </form>
            </Paper>
        );
    }

    submit(ev: Event) {
        const email = this.state['email'];
        const pass = this.state['password'];
        if (this.props.onSubmit !== undefined) {
            this.props.onSubmit(email, pass);
        }
        ev.preventDefault();
        return false;
    }
}
export default LoginForm;