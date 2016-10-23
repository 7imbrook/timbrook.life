import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { app } from '../reducers/index';

declare var window: any;

let store = createStore(
    app,
    compose(
        applyMiddleware(thunk),
        applyMiddleware(routerMiddleware(browserHistory)),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default store;
