import * as React from 'react';
import {
    Dialog,
    FlatButton
} from 'material-ui';

const customContentStyle: any = {
  width: '100%',
  maxWidth: 'none',
};

export interface AddTaskDialogProps {
    open: boolean;
    openChange: (change: boolean) => void;
}

interface AddTaskDialogState {

}

/**
 * The dialog width has been set to occupy the full width of browser through the `contentStyle` property.
 */
class AddTaskDialog extends React.Component<AddTaskDialogProps, AddTaskDialogState> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const actions: any[] = [
            <FlatButton
                label='Cancel'
                primary={true}
                onTouchTap={() => this.props.openChange(false) }
            />,
            <FlatButton
                label='Submit'
                primary={true}
                onTouchTap={ () => this.props.openChange(false) }
            />
        ];

        return (
            <div>
                <Dialog
                    title={'Dialog With Custom Width'}
                    actions={actions}
                    modal={true}
                    contentStyle={customContentStyle}
                    open={this.props.open}
                >
                    {'This dialog spans the entire width of the screen.'}
                </Dialog>
            </div>
        );
    }
}

export default AddTaskDialog;