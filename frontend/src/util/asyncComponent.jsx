import React, {Component} from 'react';

const asyncComponent = (importComponent) => {
    /**
     * This component should only be used for top level async loading.
     * It will say "Loading..." in a full page take over when pulling
     * in a new component.
     */
    return class extends Component {
        constructor() {
            super();
            this.state = {
                component: null
            }
        }
        componentDidMount() {
            importComponent()
                .then(cmp => {
                    this.setState({component: cmp.default});
                });
        }

        renderLoading() {
            return (
                <div className="not_found">
                    <div className="not_found_body">
                        <h2>Loading...</h2>
                    </div>
                </div>
            );
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props}/> : this.renderLoading();
        }
    }
};

export default asyncComponent;