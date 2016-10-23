import { connect } from 'react-redux';
import { LoginForm, LoginProps} from '../components/LoginForm';
import { login } from '../actions/user';

function mapStateToProps(state: any): LoginProps {
    return {
        lock: state.session.pending,
        error: state.session.error
    };
}

function mapDispatchToProps(dispatch: any): LoginProps {
    return {
        onSubmit(email: string, pass: string) {
            dispatch(login(email, pass));
        }
    };
}

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;
