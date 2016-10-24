import { connect } from 'react-redux';
import Home, { HomeProps } from '../components/Home';
import { State } from '../reducers/index';

function mapStateToProps(state: State): HomeProps {
    return {
        tasks: state.tasks.tasks
    };
}

function mapDispatchToProps(_dispatch: any): {} {
    return {

    };
}

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default HomeContainer;
