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

export interface HomeProps {
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

class Home extends React.Component<HomeProps, {}> {
    componentWillMount() {
        if (this.props.loadTasks !== undefined) {
            this.props.loadTasks();
        }
    }

    _renderSublist(cat: String) {
        const tasks: Task[] = this.props.tasks[cat as string] || [];
        return tasks.map(task => {
            return <ListItem key={task.name} rightIcon={<ActionInfo />} >{task.name}</ListItem>;
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

export default Home;