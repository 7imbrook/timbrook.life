import * as React from 'react';
import ActionInfo from 'material-ui/svg-icons/action/info';
import {
    IconMenu,
    IconButton,
    MenuItem
} from 'material-ui';
import {
    grey400
} from 'material-ui/styles/colors';

export interface TaskActionMenuProps {
    deleteItem: () => void;
}

const TaskActionMenu = (props: TaskActionMenuProps) => {

    const iconButton = (
        <IconButton touch={true}>
            <ActionInfo color={grey400} />
        </IconButton>
    );

    return (<IconMenu iconButtonElement={iconButton} >
        <MenuItem>Edit</MenuItem>
        <MenuItem onClick={props.deleteItem}>Delete</MenuItem>
    </IconMenu>);
};

export default TaskActionMenu;