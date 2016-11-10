import { connect } from 'react-redux';
import SidebarDrawer, { SidebarDrawerProps } from '../components/SidebarDrawer';
import { push } from 'react-router-redux';

function mapStateToProps(_state: any, ownProps: any): SidebarDrawerProps {
    return {
        drawerOpen: ownProps.open,
        onLeftIconButtonTouchTap: ownProps.onLeftIconButtonTouchTap
    };
}

function mapDispatchToProps(dispatch: any): any {
    return {
        linkTo: (path: string) => {
            dispatch(push(path));
        }
    };
}

const DrawerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarDrawer);

export default DrawerContainer;
