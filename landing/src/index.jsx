import './css/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import asyncComponent from './util/asyncComponent';
import Home from './entrypoints/Home';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

const root = document.getElementById('root');

const AsyncNotFound = asyncComponent(() => {
    return import('./entrypoints/404')
});

ReactDOM.render(
    (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route component={AsyncNotFound} />
            </Switch>
        </Router>
    ),
    root,
);
