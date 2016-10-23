import 'whatwg-fetch';
import {
    errorCheck,
    throttle
} from './util';
import { push } from 'react-router-redux';
import { Lesson } from '../reducers/lessonReducer';

export interface CreateLessonPending {
    type: 'create_lesson_pending';
}

export interface CreateLessonSuccess {
    type: 'create_lesson_success';
    id: number;
}

export interface CreateLessonFailure {
    type: 'create_lesson_failure';
}

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export function loadLessons() {
    return (dispatch: any) => {
        dispatch({
            type: 'load_lessons_pending'
        });
        fetch('/api/lesson/all', {
            headers,
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((res: Lesson[]) => {
            dispatch({
                type: 'load_all_lesssons_success',
                lessons: res
            });
        });
    };
}

export function loadLesson(id: number) {
    return (dispatch: any) => {
        dispatch({
            type: 'load_lesson_pending'
        });
        fetch('/api/lesson/' + id, {
            headers,
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((res: Lesson) => {
            dispatch({
                type: 'save_lesson_local',
                lesson: res
            });
        });
    };
}

export function createLesson() {
    return (dispatch: any) => {
        dispatch({
            type: 'create_lesson_pending'
        });
        fetch('/api/lesson', {
            method: 'POST',
            headers,
            credentials: 'same-origin'
        })
        .then(errorCheck)
        .then((res: Lesson) => {
            dispatch({
                type: 'create_lesson_success',
                id: res.id
            });
            dispatch(push('/lesson/' + res.id));
        });
    };
}

export function saveLesson(l: Lesson) {
    return (dispatch: any) => {
        dispatch({
            type: 'save_lesson_local',
            lesson: l
        });

        throttle(() => {
            dispatch({
                type: 'save_lesson_pending'
            });
            fetch('/api/lesson/' + l.id, {
                method: 'PATCH',
                headers,
                credentials: 'same-origin',
                body: JSON.stringify(l)
            })
            .then(errorCheck)
            .then((_res: Lesson) => {
                dispatch({
                    type: 'save_lesson_success',
                });
            });
        }, 1000);
    };
}
