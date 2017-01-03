import { connect } from 'react-redux';
import { LoginForm, LoginProps} from '../components/LoginForm';

function mapStateToProps(state: any): LoginProps {
    return {
        lock: state.session.pending,
        error: state.session.error
    };
}

function mapDispatchToProps(_dispatch: any): LoginProps {
    return {
        onSubmit(_email: string, _pass: string) {

        }
    };
}

const LoginFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;
