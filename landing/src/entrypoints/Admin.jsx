import 'css/admin.scss';

import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import Sidebar from 'components/admin/Sidebar';
import Main from 'components/admin/Main';
import NotFound from 'entrypoints/404';

const Admin = ({ match }) => {
    return (
        <div className="admin-layout">
            <Sidebar className="admin-sidebar" />
            <div className="admin-main">
                <Router>
                    <Switch>
                        <Route exact path={`${match.path}/`} component={Main} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </div>
        </div>
    );
};

export default Admin;