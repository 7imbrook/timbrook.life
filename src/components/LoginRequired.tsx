import * as React from 'react';
import LoginFormContainer from '../containers/LoginFormContainer';

export interface LoginRequiredProps {
    isLoggedIn: boolean;
    children?: Element[];
}

export class LoginRequired extends React.Component<LoginRequiredProps, {}> {

    render() {
        const content = this.props.isLoggedIn ? this.props.children : <LoginFormContainer />;
        return  (
            <div>
                {content}
            </div>
        );
    }
}

export default LoginRequired;
