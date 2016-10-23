export interface WordInfo {
    id?: number;
    word: string;
}

export interface Lesson {
    id: string;
    title: string;
    word_infos: WordInfo[];
}

export type LessonState = {[id: string]: Lesson};

export const lessonReducer = (state: LessonState, action: any): LessonState => {
    if (state === undefined) return {};
    switch (action.type) {
        case 'save_lesson_local':
            return Object.assign({
                [action.lesson.id]: action.lesson
            }, state);
        case 'create_lesson_success':
            return Object.assign({
                [action.id]: {
                    id: action.id,
                    title: '',
                    word_infos: []
                }
            }, state);
        case 'load_all_lesssons_success':
            return action.lessons.reduce((s: any, lesson: Lesson) => {
                s[lesson.id] = lesson;
                return s;
            }, {});
        default:
            return state;
    }
};