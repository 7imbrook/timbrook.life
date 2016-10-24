import * as React from 'react';
import {Link} from 'react-router';
import { AppBar, Drawer } from 'material-ui';

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

    render() {
        let title = <Link style={{color: 'white', textDecoration: 'none'}} to='/'>Task Queue</Link>;
        return (
            <div style={{position: 'absolute', width: '100%', margin: 0}}>
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
                </Drawer>
                {this.props.children}
            </div>
        );
    }
};

export default App;