import {
    Subheader,
    List,
    ListItem,
    Paper,
    LinearProgress,
    TextField,
    Checkbox
} from 'material-ui';
import Page from './util/Page';
import * as React from 'react';
import { Task } from '../reducers/tasksReducer';
import TaskActionMenu from './TaskActionMenu';
import {
    grey400
} from 'material-ui/styles/colors';

// import * as Sort from 'react-anything-sortable';

import './grid.scss';

export interface TasksProps {
    categories: string[];
    loading: boolean;
    loadTasks?: () => void;
    addTask?: (n: string, c: string) => void;
    deleteTask?: (id: string) => void;
    completeTask?: (id: string, checked: boolean) => void;
    tasks: {[id: string]: Task[]};
}

interface TasksState {
    inputs: {
        [id: string]: string
    };
}

const centering = {
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '90%'
};

class Tasks extends React.Component<TasksProps, TasksState> {

    constructor(props: TasksProps) {
        super(props);
        this.state = {
            inputs: {}
        };
    }

    componentWillMount() {
        if (this.props.loadTasks !== undefined) {
            this.props.loadTasks();
        }
    }

    addTaskFromCategory(cat: string) {
        const value = this.state.inputs[cat];
        const newInputs = this.state.inputs;
        newInputs[cat] = '';
        this.setState({
            inputs: newInputs
        });
        if (this.props.addTask !== undefined) {
            this.props.addTask(value, cat);
        }
    }

    deleteTask(id: string) {
        if (this.props.deleteTask !== undefined) {
            this.props.deleteTask(id);
        }
    }

    // TODO: Make own component
    _renderSublist(cat: String) {
        const tasks: Task[] = this.props.tasks[cat as string] || [];
        return tasks.map((task, i) => {
            return <ListItem
                key={task.name + i}
                leftIcon={
                <Checkbox
                    color={grey400}
                    onCheck={(_e: any, checked: boolean) => {
                        if (this.props.completeTask !== undefined) {
                            this.props.completeTask(task.id, checked);
                        }
                    }}
                />}
                rightIconButton={TaskActionMenu({
                    task: task,
                    deleteItem: () => this.deleteTask(task.id)
                })}
                primaryText={task.name}
            />;
        });
    }

    _renderLoading() {
        return (<Page>
            <LinearProgress mode='indeterminate' />
        </Page>);
    }

    _renderAddField(cat: string) {
        const handleChange = (ev: any) => {
            const value: string = ev.target.value;
            const newInputs = this.state.inputs;
            newInputs[cat] = value;
            this.setState({
                inputs: newInputs
            });
        };

        const handleEnter = (ev: any) => {
            if (ev.keyCode === 13) {
                this.addTaskFromCategory(cat);
            }
        };

        return <TextField
                name={cat}
                floatingLabelText={ 'Add task to ' + cat }
                onChange={handleChange}
                onKeyDown={handleEnter}
                value={this.state.inputs[cat] || ''}
                style={{
                    marginRight: '20px',
                    marginLeft: '20px',
                    marginTop: '-25px',
                    marginBottom: '10px',
                    width: '90%'
                }}
            />;
    }

    render () {
        const style = {
            minWidth: '400px',
            margin: '10px',
            alignSelf: 'flex-start'
        };
        if (this.props.loading) {
            return this._renderLoading();
        }
        const pads = this.props.categories.map(cat => {
            return (<Paper key={cat} style={style}>
                <List style={{ marginBottom: '0px' }}>
                    <Subheader>{cat}</Subheader>
                    {this._renderSublist(cat)}
                </List>
                {this._renderAddField(cat)}
            </Paper>);
        });

        return (<div style={centering}>
            {pads}
        </div>);
    }
};

export default Tasks;