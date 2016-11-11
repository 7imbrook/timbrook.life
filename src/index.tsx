import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './store/exampleStore';
import App from './components/App';
import LoginRequiredContainer from './containers/LoginRequiredContainer';
import { MuiThemeProvider } from 'material-ui/styles';
import TasksContainer from './containers/TasksContainer';
import { init } from './actions/index';
import Dashboard from './components/Dashboard';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    blueGrey400
} from 'material-ui/styles/colors';

import './main.scss';

import * as injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(init());

const theme = getMuiTheme({
    palette: {
        primary1Color: blueGrey400
    }
});

const base = (
    <MuiThemeProvider muiTheme={theme}>
        <Provider store={store}>
            <Router history={history}>
                <Route path='/' component={App}>
                    <Route component={LoginRequiredContainer}>
                        <IndexRoute component={Dashboard} />
                        <Route path='/tasks' component={TasksContainer} />
                    </Route>
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>);

ReactDOM.render(
    base,
    document.getElementById('app')
);
