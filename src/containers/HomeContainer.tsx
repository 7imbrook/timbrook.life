import { connect } from 'react-redux';
import Home, { HomeProps } from '../components/Home';
import { State } from '../reducers/index';
import { loadTasks } from '../actions/tasks';
import { Task } from '../reducers/tasksReducer';

function mapStateToProps(state: State): HomeProps {
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

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default HomeContainer;
