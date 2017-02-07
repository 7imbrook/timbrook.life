import * as React from 'react';
import Page from './util/Page';

const Dashboard = (_props: any) => {
    return (<Page>
        <div style={{ display: 'flex' }}>
            <img
            src='https://s.gravatar.com/avatar/86fd22cac0b6714252b9246cd5e03e0a?s=400'
            style={{ height: '200px', borderRadius: '50%' }}
            />
            <div style={{ display: 'inline', margin: '20px', marginTop: '30px' }}>
                <h2 style={{ margin: '0px'}}>Michael Timbrook</h2>
                <h5 style={{ margin: '0px'}}>Software Engineer</h5>
                <p>
                    This is my task board, and other life tracking related tools site. Nothing really to see here because it's now not completely open.
                </p>
            </div>
        </div>
    </Page>);
};

export default Dashboard;
