import {
    Subheader,
    List,
    ListItem
} from 'material-ui';
import ActionInfo from 'material-ui/svg-icons/action/info';

import Page from './util/Page';
import * as React from 'react';
import { Task } from '../reducers/tasksReducer';
export interface HomeProps {
    tasks: Task[];
}

export const Home = (_props: HomeProps) => {
    const ts = _props.tasks.map((task: Task) => <ListItem key={task.name} rightIcon={<ActionInfo />}>{task.name}</ListItem> );
    return (<Page>
        <List>
            <Subheader>Tasks</Subheader>
            {ts}
        </List>
    </Page>);
};

export default Home;