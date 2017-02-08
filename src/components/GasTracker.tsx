import * as React from 'react';
import AutoFormContainer from '../containers/AutoFormContainer';
import {
    Dialog,
    FlatButton,
    RaisedButton,
    Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui';
import { GasFill } from '../reducers/gasReducer';

export interface GasTrackerProps {
    onLoad?: () => void;
    addFill?: (fill: GasFill) => void;
    log: GasFill[];
}

interface GasTrackerState {
    open: boolean;
}

class GasTracker extends React.Component<GasTrackerProps, GasTrackerState> {

    constructor(props: GasTrackerProps) {
        super(props);
        this.state = {
            open: false
        };
    }

    componentWillMount() {
        if (this.props.onLoad !== undefined) {
            this.props.onLoad();
        }
    }

    _renderRows() {
        return this.props.log.map((gasLog: GasFill) => {
            console.log(gasLog);
            return (
                <TableRow key={gasLog.id + 'row'}>
                    <TableRowColumn>{gasLog.id}</TableRowColumn>
                    <TableRowColumn>{gasLog.millage}</TableRowColumn>
                    <TableRowColumn>{gasLog.gallons}</TableRowColumn>
                    <TableRowColumn>{gasLog.unit_price}</TableRowColumn>
                </TableRow>
            );
        });
    }

    didSubmitNewLog(payload: GasFill) {
        if (this.props.addFill !== undefined) {
            this.props.addFill(payload);
        }
        this.handleClose();
        return true;
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label='Cancel'
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];

        return (
            <div>
                <Dialog
                    title='Gas Fillup Form'
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                >
                    <AutoFormContainer
                        endpoint='/api/gaslog'
                        excludes={['id']}
                        onSubmit={this.didSubmitNewLog.bind(this)}/>
                </Dialog>
                <RaisedButton label='Add Gas Fillup' onTouchTap={this.handleOpen} />
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Millage</TableHeaderColumn>
                            <TableHeaderColumn>Gallons</TableHeaderColumn>
                            <TableHeaderColumn>Price</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this._renderRows()}
                    </TableBody>
                </Table>
            </div>
        );
    }
};

export default GasTracker;
