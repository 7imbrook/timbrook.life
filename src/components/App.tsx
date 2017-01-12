import * as React from 'react';
import {
    AppBar
} from 'material-ui';
import DrawerContainer from '../containers/DrawerContainer';
import store from '../store';
import { push } from 'react-router-redux';

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

    pushRoute(path: string) {
        store.dispatch(push(path));
    }

    toggleDrawState(to?: boolean) {
        this.setState({
            drawerOpen: to !== undefined ? to : !this.state.drawerOpen
        });
    }

    render() {
        let title = <div
            style={{color: 'white', textDecoration: 'none'}}
            onClick={() => this.pushRoute('/')}>
                Timbrook.Life
        </div>;
        return (
            <div style={{position: 'absolute', width: '100%', margin: 0}}>
                <AppBar
                        title={title}
                        iconClassNameRight='muidocs-icon-navigation-expand-more'
                        onLeftIconButtonTouchTap={ () => this.toggleDrawState() }/>
                <DrawerContainer open={this.state.drawerOpen} onLeftIconButtonTouchTap={ () => this.toggleDrawState() } />
                <div style={{ width: '90%', margin: 'auto' }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
};

export default App;