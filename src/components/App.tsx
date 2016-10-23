import * as React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';

export interface AppProps {
    children?: Element[];
}

const App = (props: AppProps) => {
    let title = <Link style={{color: 'white', textDecoration: 'none'}} to='/'>Task Queue</Link>;
    return (
        <div style={{position: 'absolute', width: '100%', margin: 0}}>
        <AppBar
                    title={title}
                    iconClassNameRight='muidocs-icon-navigation-expand-more'/>
            {props.children}
        </div>
    );
};

export default App;