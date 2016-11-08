import { connect } from 'react-redux';
import AddTaskDialog from '../components/AddTaskDialog';
import { State } from '../reducers/index';

function mapStateToProps(_state: State): any {
    return {};
}

function mapDispatchToProps(_dispatch: any): {} {
    return {};
}

const AddTaskDialogContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTaskDialog);

export default AddTaskDialogContainer;
