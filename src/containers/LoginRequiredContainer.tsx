import { connect } from 'react-redux';
import LoginRequired, { LoginRequiredProps } from '../components/LoginRequired';
import { State } from '../reducers/index';

function mapStateToProps(_state: State): LoginRequiredProps {
    return {isLoggedIn: true};
}

function mapDispatchToProps(_dispatch: any): {} {
    return {};
}

const LoginRequiredContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginRequired);

export default LoginRequiredContainer;