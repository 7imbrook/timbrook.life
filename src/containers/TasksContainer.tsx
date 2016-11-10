import { connect } from 'react-redux';
import Tasks, { TasksProps } from '../components/Tasks';
import { State } from '../reducers/index';
import { loadTasks } from '../actions/tasks';
import { Task } from '../reducers/tasksReducer';

function mapStateToProps(state: State): TasksProps {
    return {
        loading: state.tasks.loading && state.tasks.tasks.length === 0,
        categories: state.tasks.catigories,
        tasks: state.tasks.tasks.reduce(
            (acc: any, task: Task) => {
                if (acc[task.category] === undefined) {
                    acc[task.category] = [];
                }
                acc[task.category].push(task);
                return acc;
            },
            {}
        )
    };
}

function mapDispatchToProps(dispatch: any): {} {
    return {
        loadTasks: () => {
            dispatch(loadTasks());
        }
    };
}

const TasksContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Tasks);

export default TasksContainer;