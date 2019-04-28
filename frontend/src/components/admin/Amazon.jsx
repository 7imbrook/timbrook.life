import React, { Component } from 'react';


class Amazon extends Component {

    componentWillMount() {
        const token = localStorage.getItem("token");
        fetch("/api/p/audit", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(console.log)
            .catch(err => {
                console.log(err);
            })
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
