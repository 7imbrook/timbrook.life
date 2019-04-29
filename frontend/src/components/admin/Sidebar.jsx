import React from 'react';
import { Link } from "react-router-dom";


// TODO: move
function logout() {
    fetch("/api/auth/logout", {
        method: "POST"
    }).then(res => {
        location.reload();
    })
}

const Sidebar = ({ className }) => {
    return (
        <div className={className}>
            <h1>
                <Link to="/admin">
                    Timbrook.tech
                </Link>
            </h1>
            <footer>
                <button onClick={logout}>Logout</button>
            </footer>
        </div>
    );
};

export default Sidebar;