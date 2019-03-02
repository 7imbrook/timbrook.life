import 'css/podcast.scss'

import React from 'react';
import { Provider } from 'react-redux'

import store from 'stores/store';
import Podcast from './Podcast';

export default ({ match }) => {
    return (
        <Provider store={store}>
            <Podcast {...match.params} />
        </Provider>
    );
}