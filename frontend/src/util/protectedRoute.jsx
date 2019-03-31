import React from "react";
import {
    Route,
    Redirect,
} from "react-router-dom";


export function AdminRoute({ component: Component, ...rest }) {
    // Check auth
    let isAuthenticated = false;

    // TODO: check cookie better
    var match = document.cookie.match(new RegExp('(^| )sessionid=([^;]+)'));
    isAuthenticated = (
        match !== null &&
        match[2] !== undefined
    );

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
}
