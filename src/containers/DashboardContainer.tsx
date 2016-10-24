import { connect } from 'react-redux';
import Dashboard, { DashboardProps } from '../components/Dashboard';
import { State } from '../reducers/index';

function mapStateToProps(_state: State): DashboardProps {
    return {isLoggedIn: true};
}

function mapDispatchToProps(_dispatch: any): {} {
    return {};
}

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export default DashboardContainer;
