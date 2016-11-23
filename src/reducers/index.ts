import { SessionState, sessionReducer } from './sessionReducer';
import { TasksState, tasksReducer } from './tasksReducer';
import { RequestsState, requestsReducer } from './requestsReducer';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export interface State {
    session: SessionState;
    tasks: TasksState;
    routing: any;
    requests: RequestsState;
}

export const app = combineReducers({
    session: sessionReducer,
    routing: routerReducer,
    tasks: tasksReducer,
    requests: requestsReducer,
});
