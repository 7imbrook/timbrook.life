import React, { Component } from 'react';
import moment from 'moment';

class Amazon extends Component {

    constructor(props) {
        super(props);
        this.state = {
            audits: []
        }
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        fetch("/api/p/audit?order=published_at.desc", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(audits => this.setState({
                audits
            }))
            .catch(err => {
                console.log(err);
            })
    }

    renderAuditRow(row) {
        const published_at = moment(row.published_at);
        const now = moment()
        return <tr key={row.id}>
            <td>{row.event}</td>
            <td>{row.action}</td>
            <td>{published_at.from(now)}</td>
        </tr>
    }

    render() {
        const { audits } = this.state;
        return (
            <div>
                <h3>Door System Event History</h3>
                <table>
                    <thead>
                        <tr>
                            <td>Event</td>
                            <td>Action</td>
                            <td>Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {audits.map(this.renderAuditRow)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Amazon;
