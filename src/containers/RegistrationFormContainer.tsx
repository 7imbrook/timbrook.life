import { connect } from 'react-redux';
import { RegistrationForm, RegistrationProps} from '../components/RegistrationForm/RegistrationForm';
import { register } from '../actions/user';
import { State } from '../reducers';

function mapStateToProps(state: State): RegistrationProps {
    return {
        pending: state.registration.pending,
        errors: state.registration.errors
    };
}

function mapDispatchToProps(dispatch: any): RegistrationProps {
    return {
        onSubmit(uname: string, pass: string, email: string, birthday: string) {
            dispatch(register(uname, pass, email, birthday));
        }
    };
}

const RegistrationFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegistrationForm);

export default RegistrationFormContainer;
