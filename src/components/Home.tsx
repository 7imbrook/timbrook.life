import {
    Subheader,
    List,
    ListItem,
    LinearProgress,
    Paper
} from 'material-ui';
import ActionInfo from 'material-ui/svg-icons/action/info';

import * as React from 'react';
import { Task } from '../reducers/tasksReducer';

import './grid.scss';

export interface HomeProps {
    tasks: Task[];
    loading: boolean;
    loadTasks?: () => void;
}

const style = {
    minWidth: '30%',
    margin: '10px'
};

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
        return (<div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <Paper style={style}>
                <List>
                    <Subheader>Tasks</Subheader>
                    {ts}
                </List>
            </Paper>
            <Paper style={style}>
                <List>
                    <Subheader>Tasks</Subheader>
                    {ts}
                </List>
            </Paper>
            <Paper style={style}>
                <List>
                    <Subheader>Tasks</Subheader>
                    {ts}
                </List>
            </Paper>
            <Paper style={style}>
                <List>
                    <Subheader>Task</Subheader>
                    {ts}
                </List>
            </Paper>
        </div>);
    }
};

export default Home;