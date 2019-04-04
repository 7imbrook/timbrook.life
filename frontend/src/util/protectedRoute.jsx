import React, { Component } from 'react';
import {
    Route,
    Redirect,
} from "react-router-dom";

const authcheck = {
    NOT_LOGGED_IN: 'not_logged_in',
    LOGGED_IN: 'logged_in',
    CHECKING: 'checking',
}


export class AdminRoute extends Component {

    constructor() {
        super();
        this.state = {
            auth: authcheck.CHECKING
        }
    }

    componentWillMount() {
        window.cookieStore.get("logged_as").then(cookie => {
            if (cookie === null) {
                this.setState({
                    auth: authcheck.NOT_LOGGED_IN
                })
            } else {
                // Maybe validate?
                this.setState({
                    auth: authcheck.LOGGED_IN
                })
            }
        })
    }

    redirect(location) {
        return (<Redirect
            to={{
                pathname: "/login",
                state: { from: location }
            }}
        />);
    }

    render() {
        const { component: Component, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props => {
                    switch (this.state.auth) {
                        case authcheck.LOGGED_IN:
                            return (
                                <Component {...props} />
                            )
                        case authcheck.NOT_LOGGED_IN:
                            return this.redirect(props.location)
                        case authcheck.CHECKING:
                        default:
                            return (
                                <div />
                            )
                    }
                }
                }
            />
        );
    }
}

