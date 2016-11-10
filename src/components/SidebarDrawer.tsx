import * as React from 'react';
import {
    AppBar,
    Drawer,
    List,
    ListItem
} from 'material-ui';

import Home from 'material-ui/svg-icons/action/home';
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';

export interface SidebarDrawerProps {
    drawerOpen: boolean;
    onLeftIconButtonTouchTap: () => void;
    linkTo?: (path: string) => void;
}

interface SidebarDrawerState {

}

class SidebarDrawer extends React.Component<SidebarDrawerProps, SidebarDrawerState> {

    constructor(props: SidebarDrawerProps) {
        super(props);
    }

    goTo(path: string) {
        if (this.props.linkTo !== undefined) {
            this.props.onLeftIconButtonTouchTap();
            this.props.linkTo(path);
        }
    }

    render() {
        return (<Drawer
                    docked={false}
                    width={300}
                    open={this.props.drawerOpen}
                    onRequestChange={this.props.onLeftIconButtonTouchTap}>
                    <AppBar
                        onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap}
                        title='Menu' />
                    <List>
                        <ListItem leftIcon={<Home />} primaryText='Home' onClick={ () => this.goTo('/') } />
                        <ListItem leftIcon={<ActionAssignmentTurnedIn />} primaryText='Tasks' onClick={ () => this.goTo('/tasks') } />
                    </List>
                </Drawer>);
    }

}

export default SidebarDrawer;