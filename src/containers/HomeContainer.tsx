import { connect } from 'react-redux';
import Home, { HomeProps } from '../components/Home';
import { State } from '../reducers/index';
import { createLesson, loadLessons } from '../actions/lesson';
import { push } from 'react-router-redux';

function mapStateToProps(state: State): HomeProps {
    return {
        lessons: Object.keys(state.lesson).map((idx: string) => state.lesson[idx])
    };
}

function mapDispatchToProps(dispatch: any): {} {
    // Note, loads lesson on every vist of Home
    dispatch(loadLessons());
    return {
        onCreateLessonClick: () => {
            dispatch(createLesson());
        },
        onClickLesson: (id: number) => {
            dispatch(push('/lesson/' + id));
        }
    };
}

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

export default HomeContainer;
