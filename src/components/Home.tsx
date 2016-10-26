import {
    Subheader,
    List,
    ListItem,
    LinearProgress
} from 'material-ui';
import ActionInfo from 'material-ui/svg-icons/action/info';

import Page from './util/Page';
import * as React from 'react';
import { Task } from '../reducers/tasksReducer';

export interface HomeProps {
    tasks: Task[];
    loading: boolean;
    loadTasks?: () => void;
}

class Home extends React.Component<HomeProps, {}> {
    componentWillMount() {
        if (this.props.loadTasks !== undefined) {
            this.props.loadTasks();
        }
    }

    render () {
        const refresh = <LinearProgress mode='indeterminate' />;
        const ts = this.props.loading ?
            refresh :
            this.props.tasks.map((task: Task) => <ListItem key={task.name} rightIcon={<ActionInfo />}>{task.name}</ListItem> )
        ;
        return (<Page>
            <List>
                <Subheader>Tasks</Subheader>
                {ts}
            </List>
        </Page>);
    }
};

export default Home;