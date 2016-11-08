import * as React from 'react';
import {Link} from 'react-router';
import {
    AppBar,
    Drawer,
    List,
    ListItem
} from 'material-ui';
import AddTaskDialogContainer from '../containers/AddTaskDialogContainer';
export interface AppProps {
    children?: Element[];
}

interface AppState {
    drawerOpen: boolean;
}

class App extends React.Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props);
        this.state = {
            drawerOpen: false
        };
    }

    toggleDrawState(to?: boolean) {
        this.setState({
            drawerOpen: to !== undefined ? to : !this.state.drawerOpen
        });
    }

    addItem() {
        console.log('add item');
        this.toggleDrawState(false);
    }

    render() {
        let title = <Link style={{color: 'white', textDecoration: 'none'}} to='/'>Task Queue</Link>;
        return (
            <div style={{position: 'absolute', width: '100%', margin: 0}}>
                {/* <AddTaskDialogContainer /> */}
                <AppBar
                        title={title}
                        iconClassNameRight='muidocs-icon-navigation-expand-more'
                        onLeftIconButtonTouchTap={ () => this.toggleDrawState() }/>
                <Drawer
                    docked={false}
                    width={300}
                    open={this.state.drawerOpen}
                    onRequestChange={ (open) => this.toggleDrawState(open) }>
                    <AppBar
                        onLeftIconButtonTouchTap={ () => this.toggleDrawState() }
                        title='Menu' />
                    <List>
                        <ListItem onClick={ () => this.addItem() } >Add Item</ListItem>
                    </List>
                </Drawer>
                {this.props.children}
            </div>
        );
    }
};

export default App;