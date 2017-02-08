import { connect } from 'react-redux';
import AutoForm, { AutoFormProps } from '../components/AutoForm';
import { State } from '../reducers/index';
import { formSpecForURL, submitURLGeneric } from '../actions/autodata';

export interface AutoFormContainerProps extends AutoFormProps {
    endpoint: string;
    onSubmit?: (payload: any) => boolean;
}

function mapStateToProps(state: State, ownProps: AutoFormContainerProps): any {
    return {
        inputs: state.autoForm[ownProps.endpoint],
        ...ownProps
    };
}

function mapDispatchToProps(dispatch: any, ownProps: AutoFormContainerProps): any {
    return {
        onLoad: () => dispatch(formSpecForURL(ownProps.endpoint)),
        onChange: (payload: any) => {
            if (ownProps.onSubmit === undefined || ownProps.onSubmit(payload)) {
                // dispatch save event
                dispatch(submitURLGeneric(ownProps.endpoint, payload));
            }
        }
    };
}

const AutoFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AutoForm);

export default AutoFormContainer;
