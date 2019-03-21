import React from 'react';
import { Link } from "react-router-dom";


const Sidebar = ({ className }) => {
    return (
        <div className={className}>
            <h1>
                <Link to="/">
                    Timbrook.tech
                </Link>
            </h1>
        </div>
    );
};

export default Sidebar;