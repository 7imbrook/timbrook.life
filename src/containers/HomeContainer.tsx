import { connect } from 'react-redux';
import Home, { HomeProps } from '../components/Home';
import { State } from '../reducers/index';
import { loadTasks } from '../actions/tasks';

function mapStateToProps(state: State): HomeProps {
    return {
        tasks: state.tasks.tasks
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
