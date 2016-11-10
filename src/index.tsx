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

import './main.scss';

import * as injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(init());

const base = (
    <MuiThemeProvider>
        <Provider store={store}>
            <Router history={history}>
                <Route path='/' component={App}>
                    <Route component={LoginRequiredContainer}>
                        <IndexRoute component={TasksContainer} />
                    </Route>
                </Route>
            </Router>
        </Provider>
    </MuiThemeProvider>);

ReactDOM.render(
    base,
    document.getElementById('app')
);
