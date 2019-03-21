import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";


export function AdminRoute({ component: Component, ...rest }) {
    // Check auth
    let isAuthenticated = false;

    // TODO: check cookie better
    const res = document.cookie.match("sessionid=([A-Za-z]+)")
    isAuthenticated = (
        res !== null && 
        res.length > 1 && 
        res[1] === "test"
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
