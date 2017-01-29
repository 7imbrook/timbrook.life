import { connect } from 'react-redux';
import AutoForm, { AutoFormProps } from '../components/AutoForm';
import { State } from '../reducers/index';
import { formSpecForURL } from '../actions/autodata';

export interface AutoFormContainerProps {
    endpoint: string;
}

function mapStateToProps(state: State, ownProps: AutoFormContainerProps): AutoFormProps {
    return { inputs: state.autoForm[ownProps.endpoint] };
}

function mapDispatchToProps(dispatch: any, ownProps: AutoFormContainerProps): {} {
    dispatch(formSpecForURL(ownProps.endpoint));
    return { };
}

const AutoFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AutoForm);

export default AutoFormContainer;
