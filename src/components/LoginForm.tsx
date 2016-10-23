import * as React from 'react';
import BindingComponent from './util/BindingComponent';
import {Link} from 'react-router';
import Page from './util/Page';

import {
    RaisedButton,
    TextField,
    CircularProgress
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
            <br /> <br />
            <Link to='/register'>Register</Link>
        </div>;

        const spinner = <div>
            <br />
            <CircularProgress />
        </div>;

        return (
            <Page>
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
            </Page>
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