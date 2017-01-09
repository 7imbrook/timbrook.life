import { connect } from 'react-redux';
import { LoginForm, LoginProps} from '../components/LoginForm';
import { State } from '../reducers';
import { refreshAuthToken } from '../actions/auth';

function mapStateToProps(state: State): LoginProps {
    return {
        lock: state.session.pending && !state.session.isLoggedIn,
        error: state.session.error
    };
}

function mapDispatchToProps(dispatch: any): LoginProps {
    return {
        onSubmit(username: string) {
            dispatch({
                type: 'set_active_user',
                username
            });
            dispatch(refreshAuthToken());
        }
    };
}

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;
