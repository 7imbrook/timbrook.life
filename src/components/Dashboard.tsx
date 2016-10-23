import * as React from 'react';
import LoginFormContainer from '../containers/LoginFormContainer';

export interface DashboardProps {
    isLoggedIn: boolean;
    children?: Element[];
}

export class Dashboard extends React.Component<DashboardProps, {}> {

    render() {
        const content = this.props.isLoggedIn ? this.props.children : <LoginFormContainer />;
        return  (
            <div>
            {content}
            </div>
        );
    }
}

export default Dashboard;