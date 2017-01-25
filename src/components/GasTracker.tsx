import * as React from 'react';

export interface GasTrackerProps {
}

interface GasTrackerState {
}

const centering = {
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '90%'
};

class GasTracker extends React.Component<GasTrackerProps, GasTrackerState> {

    constructor(props: GasTrackerProps) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <div style={centering}>
                Gas Tracker
            </div>
        );
    }
};

export default GasTracker;
