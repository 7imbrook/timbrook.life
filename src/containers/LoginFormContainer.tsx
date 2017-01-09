import { connect } from 'react-redux';
import { LoginForm, LoginProps} from '../components/LoginForm';
import { State } from '../reducers';
import { requestFreshAuthToken } from '../actions/auth';

function mapStateToProps(state: State): LoginProps {
    return {
        lock: state.session.pending && !state.session.isLoggedIn,
        error: state.session.error
    };
}

function mapDispatchToProps(dispatch: any): LoginProps {
    return {
        onSubmit(username: string, code: string) {
            dispatch({
                type: 'set_active_user',
                username
            });
            dispatch(requestFreshAuthToken(code));
        }
    };
}

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;
