import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { app } from '../reducers/index';
import {
    loadState as sessionLoad,
    registerStore as sessionRegister
} from './authPersistance';

declare var window: any;

let persistedState = {
    session: sessionLoad()
};

let store = createStore(
    app,
    persistedState,
    compose(
        applyMiddleware(thunk),
        applyMiddleware(routerMiddleware(browserHistory)),
        window.devToolsExtension ? window.devToolsExtension() : (f: any) => f
    )
);

sessionRegister(store);

export default store;
