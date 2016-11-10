import {
    Subheader,
    List,
    ListItem,
    Paper
} from 'material-ui';
import ActionInfo from 'material-ui/svg-icons/action/info';

import * as React from 'react';
import { Task } from '../reducers/tasksReducer';

import './grid.scss';

export interface TasksProps {
    categories: string[];
    loading: boolean;
    loadTasks?: () => void;
    tasks: {[id: string]: Task[]};
}

const style = {
    minWidth: '400px',
    margin: '10px',
    alignSelf: 'flex-start'
};

class Tasks extends React.Component<TasksProps, {}> {
    componentWillMount() {
        if (this.props.loadTasks !== undefined) {
            this.props.loadTasks();
        }
    }

    _renderSublist(cat: String) {
        const tasks: Task[] = this.props.tasks[cat as string] || [];
        return tasks.map((task, i) => {
            return <ListItem key={task.name + i} rightIcon={<ActionInfo />} >{task.name}</ListItem>;
        });
    }

    render () {
        const pads = this.props.categories.map(cat => {
            return (<Paper key={cat} style={style}>
                <List>
                    <Subheader>{cat}</Subheader>
                    {this._renderSublist(cat)}
                </List>
            </Paper>);
        });

        return (<div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {pads}
        </div>);
    }
};

export default Tasks;