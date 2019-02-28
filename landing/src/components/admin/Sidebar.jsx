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
            <ul>
                <li>Test</li>
                <li>sidebar</li>
                <li>list</li>
                <li>items</li>
            </ul>
        </div>
    );
};

export default Sidebar;