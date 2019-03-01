import 'css/not_found.scss';
import 'css/login.scss';

import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import { Redirect } from 'react-router-dom';
const KEY = "login";


class Login extends Component {

    constructor() {
        super();
        this.state = {
            key_buf: [],
            waiting: true,
            redirect: false,
        }
        this.keyPress = this.keyPress.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        window.addEventListener('keyup', this.keyPress);
    }

    keyPress(event) {
        if (!this.state.waiting) {
            window.removeEventListener('keyup', this.keyPress, false);
            return;
        }
        const buf = this.state.key_buf;
        buf.push(event.key);
        if (buf.length > KEY.length) {
            buf.shift();
        }
        if(buf.join("") === KEY) {
            this.setState({
                waiting: false
            })
        }
        this.setState({
            key_buf: buf
        })
    }

    renderHide() {
        return (
            <div className="not_found">
                <div className="not_found_body">
                    Not Found :(
                </div>
            </div>
        );
    }

    handleSubmit({ token }, {}) {
        fetch('/api/auth/generate_session', {
            method: "POST",
            json: {
                token
            }
        })
        .then(res => res.json())
        .then(res => {
            // TODO: trigger token lifecycle
            this.setState({
                redirect: true
            });
        })
    }

    renderLoginForm() {
        return (
            <div className="login-form">
                <div className="login-box">
                    <h4>Token Please</h4>
                    <Formik 
                        initialValues={{token: ''}}
                        onSubmit={this.handleSubmit}>
                        <Form>
                            <Field autoFocus={!this.state.waiting} type="text" name="token" className="login-token"/>
                        </Form>
                    </Formik>
                </div>
            </div>
        );
    }

    render() {
        if (this.state.redirect){
            return <Redirect to={this.props.location.state.from} push />;
        }
        return this.state.waiting ? this.renderHide() : this.renderLoginForm();
    }
}

export default Login;