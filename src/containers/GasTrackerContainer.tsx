import { connect } from 'react-redux';
import GasTracker, { GasTrackerProps } from '../components/GasTracker';
import { State } from '../reducers/index';
import {
    fetchRecentFillups,
    addFill
} from '../actions/gas';

function mapStateToProps(state: State): GasTrackerProps {
    const log = Object.keys(state.gas).map((key: any) => state.gas[key]);
    return { log };
}

function mapDispatchToProps(dispatch: any): {} {
    return {
        onLoad: () => dispatch(fetchRecentFillups()),
        addFill: (fill: any) => dispatch(addFill(fill))
    };
}

const GasTrackerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GasTracker);

export default GasTrackerContainer;
