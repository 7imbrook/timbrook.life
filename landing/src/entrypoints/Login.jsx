import 'css/not_found.scss';
import 'css/login.scss';

import React, { Component } from 'react';

const KEY = "login";


class Login extends Component {

    constructor() {
        super();
        this.state = {
            key_buf: [],
            waiting: true,
        }
        this.keyPress = this.keyPress.bind(this);
    }

    componentWillMount() {
        window.addEventListener('keypress', this.keyPress);
    }

    keyPress(event) {
        if (!this.state.waiting) {
            window.removeEventListener('keypress', this.keyPress, false);
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

    renderLoginForm() {
        return (
            <div className="login-form">
                <div className="login-box">
                    <h4>Token Please</h4>
                    <input className="login-token" type="text"/>
                </div>
            </div>
        );
    }

    render() {
        return this.state.waiting ? this.renderHide() : this.renderLoginForm();
    }
}

export default Login;