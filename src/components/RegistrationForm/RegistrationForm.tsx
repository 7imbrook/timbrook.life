import * as React from 'react';
import BindingComponent from '../util/BindingComponent';
import Page from '../util/Page';

import {
    RaisedButton,
    TextField,
    CircularProgress
} from 'material-ui';

export interface RegistrationProps {
    onSubmit?: (n: string, p: string, e: string, b: string) => void;
    pending?: boolean;
    errors?: string[];
}

export class RegistrationForm extends BindingComponent<RegistrationProps> {
    constructor(_: RegistrationProps) {
        super();
        this.state = {
            user: '',
            name: '',
            password1: '',
            password2: '',
            birthday: ''
        };
    }

    isSubmittable(): boolean {
        return this.state['password1'] !== '' &&
               this.state['password2'] !== '' &&
               this.state['name'] !== '' &&
               this.state['user'] !== '' &&
               this.validEmail(this.state['user']) &&
               this.validBirthday(this.state['birthday']);
    }

    validEmail(email: string): boolean {
        return email.match(/\w+@\w+\.\w{2,}/) !== null;
    }

    validBirthday(birthday: string): boolean {
        return birthday.match(/^\d{2}\/\d{2}\/\d{4}$/) !== null;
    }

    formatBirthday(event: any) {
        let last: string = this.state['birthday'];
        let birthday: string = event.target.value;
        if (last.length < birthday.length) {
            switch (birthday.length) {
                case 2:
                case 5:
                    birthday = birthday + '/';
                    break;
                case 3:
                case 6:
                    birthday = birthday.slice(0, birthday.length - 1) + '/';
            }
        }
        this.setState({
            birthday: birthday
        });
    }

    render() {
        let error_password: any = null;
        let error_email: any = null;
        let error_birthday: any = null;

        if (this.state['password2'] !== '' && this.state['password1'] !== this.state['password2']) {
            error_password = 'Passwords do not match';
        }
        if (this.state['user'] !== '' && !this.validEmail(this.state['user'])) {
            error_email = 'Invalid Email';
        }
        if (this.state['birthday'] !== '' && !this.validBirthday(this.state['birthday'])) {
            error_birthday = 'Invalid Birthday';
        }
        const submittable = this.isSubmittable() &&
                            error_password === null &&
                            error_email === null &&
                            error_birthday === null;

        let action = <RaisedButton disabled={!submittable}
                                    type='submit'
                                    style={{marginTop: '20px'}}
                                    label='Register' />;

        if (this.props.pending) {
            action = <CircularProgress style={{paddingTop: '20px'}}/>;
        }

        let errors: any = null;
        if (this.props.errors) {
            errors = this.props.errors.map((error: string, idx: number) => {
                return <div key={'error-' + idx} style={{color: 'red'}}>{error}<br /></div>;
            });
        }

        return (
            <Page>
            <form onSubmit={this.submit.bind(this)}>
                {errors}
                <TextField hintText='Email' name='user'
                            floatingLabelText='Email'
                            value={this.state['user']}
                            onChange={this.bindValueToName.bind(this)}
                            errorText={error_email}
                            disabled={this.props.pending} />
                <br />

                <TextField hintText='Full Name' name='name'
                            floatingLabelText='Full Name'
                            value={this.state['name']}
                            onChange={this.bindValueToName.bind(this)}
                            disabled={this.props.pending} />
                <br />

                <TextField hintText='Password' name='password1'
                            floatingLabelText='Password'
                            type='password' value={this.state['password1']}
                            onChange={this.bindValueToName.bind(this)}
                            errorText={error_password}
                            disabled={this.props.pending} />
                <br />

                <TextField hintText='Confirm Password' name='password2'
                            type='password' value={this.state['password2']}
                            onChange={this.bindValueToName.bind(this)}
                            errorText={error_password}
                            disabled={this.props.pending} />
                <br />
                <TextField floatingLabelText='Birthday' name='birthday'
                            hintText='mm/dd/yyyy'
                            value={this.state['birthday']}
                            onChange={this.formatBirthday.bind(this)}
                            errorText={error_birthday}
                            disabled={this.props.pending} />
                <br />
                {action}
            </form>
            </Page>
        );
    }

    submit(ev: Event) {
        const email = this.state['user'];
        const pass = this.state['password1'];
        const name = this.state['name'];
        const birth = this.state['birthday'];
        if (this.props.onSubmit !== undefined) {
            this.props.onSubmit(name, pass, email, birth);
        }
        ev.preventDefault();
        return false;
    }
}
export default RegistrationForm;