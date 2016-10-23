import {
    Subheader,
} from 'material-ui';

import Page from './util/Page';
import * as React from 'react';

export interface HomeProps {

}

export const Home = (_props: HomeProps) => {
    return (<Page>
        <Subheader>You currently have no entries</Subheader>
    </Page>);
};

export default Home;