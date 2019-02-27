import './css/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Home from './entrypoints/Home';
import NotFound from './entrypoints/404';

import {
    BrowserRouter as Router,
    Switch,
    Route
  } from 'react-router-dom'

const root = document.getElementById('root');

ReactDOM.render(
    (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    ),
    root,
);
