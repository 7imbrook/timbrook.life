import 'css/not_found.scss';
import 'css/login.scss';

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

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
        this.loginCallback = this.loginCallback.bind(this);
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
        if (buf.join("") === KEY) {
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

    handleSubmit(token) {
        fetch('/api/auth/gen', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token
            })
        })
            .then(res => res.json())
            .then(res => {
                localStorage.setItem("logged_in", "true")
                this.setState({
                    redirect: true
                });
            })
    }

    loginCallback({ tokenId, profileObj }) {
        console.log(profileObj);
        this.handleSubmit(tokenId);
    }

    renderLoginForm() {
        return (
            <div className="login-form">
                <div className="login-box">
                    <GoogleLogin
                        clientId={CLIENT_ID}
                        buttonText="Enter with Google"
                        onSuccess={this.loginCallback}
                        onFailure={this.loginCallback}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
        );
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.props.location.state.from} push />;
        }
        return (<div>
            {this.state.waiting ? this.renderHide() : this.renderLoginForm()}
        </div>);
    }
}

export default Login;