import { SessionState, sessionReducer } from './sessionReducer';
import { TasksState, tasksReducer } from './tasksReducer';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export interface State {
    session: SessionState;
    tasks: TasksState;
    routing: any;
}

export const app = combineReducers({
    session: sessionReducer,
    routing: routerReducer,
    tasks: tasksReducer,
});
