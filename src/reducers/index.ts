import { SessionState, sessionReducer } from './sessionReducer';
import { LessonState, lessonReducer } from './lessonReducer';
import { RegistrationState, registrationReducer } from './registrationReducer';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export interface State {
    session: SessionState;
    registration: RegistrationState;
    routing: any;
    lesson: LessonState;
}

export const app = combineReducers({
    session: sessionReducer,
    registration: registrationReducer,
    routing: routerReducer,
    lesson: lessonReducer,
});
