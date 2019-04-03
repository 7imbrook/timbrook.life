import React, { Component } from 'react';


class Amazon extends Component {

    componentWillMount() {
        fetch("/api/auth/proxied/audit")
            .then(res => res.json())
            .then(console.log);
    }

    render() {
        return (
            <div>
                Hello
            </div>
        );
    }
}

export default Amazon;
