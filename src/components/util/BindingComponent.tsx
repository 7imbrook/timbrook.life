import * as React from 'react';

interface BindingState {
    [s: string]: any;
}

export class BindingComponent<P> extends React.Component<P, BindingState> {
    state: BindingState;

    componentStateChange() {

    }

    updateState(stateField: string) {
        return (value: any) => {
            this.setState({
                [stateField]: value
            }, this.componentStateChange.bind(this));
        };
    }

    bindValueToName(ev: any) {
        return this.updateState(ev.target.name)(ev.target.value);
    }
}
export default BindingComponent;