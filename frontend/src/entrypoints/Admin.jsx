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
import PodcastProvider from '../components/admin/PodcastProvider';
import Amazon from '../components/admin/Amazon';

const Admin = ({ match }) => {
    return (
        <div className="admin-layout">
            <Sidebar className="admin-sidebar" />
            <div className="admin-main">
                <Switch>
                    <Route exact path={`${match.path}/`} component={Main} />
                    <Route exact path={`${match.path}/pod/:podId`} component={PodcastProvider} />
                    <Route exact path={`${match.path}/amazon/`} component={Amazon} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </div>
    );
};

export default Admin;