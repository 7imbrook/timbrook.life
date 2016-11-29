import { connect } from 'react-redux';
import Tasks, { TasksProps } from '../components/Tasks';
import { State } from '../reducers/index';
import {
    loadTasks,
    addTask,
    deleteTask,
    addTaskToCompletion,
    removeTaskFromCompletion
} from '../actions/tasks';
import { Task } from '../reducers/tasksReducer';

function mapStateToProps(state: State): TasksProps {
    let tasksCategoryGrouped = state.tasks.tasks.reduce(
            (acc: any, task: Task) => {
                if (acc[task.category] === undefined) {
                    acc[task.category] = [];
                }
                acc[task.category].push(task);
                return acc;
            },
            {}
        );

    // Sorting
    for (const cat of state.tasks.catigories) {
        if (tasksCategoryGrouped[cat] !== undefined) {
            tasksCategoryGrouped[cat].sort((a: Task, b: Task) => {
                // TODO base32 decode, or sort creation date (when available)
                return parseInt('0x' + a.id) > parseInt('0x' + b.id);
            });
        }
    }

    return {
        loading: state.tasks.loading && state.tasks.tasks.length === 0,
        categories: state.tasks.catigories,
        tasks: tasksCategoryGrouped
    };
}

function mapDispatchToProps(dispatch: any): {} {
    return {
        loadTasks: () => {
            dispatch(loadTasks());
        },
        addTask: (name: string, cat: string) => {
            dispatch(addTask(name, cat));
        },
        deleteTask: (id: string) => {
            dispatch(deleteTask(id));
        },
        completeTask: (id: string, checked: boolean) => {
            console.log(checked);
            if (checked) {
                dispatch(addTaskToCompletion(id));
            } else {
                dispatch(removeTaskFromCompletion(id));
            }
        }
    };
}

const TasksContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Tasks);

export default TasksContainer;
