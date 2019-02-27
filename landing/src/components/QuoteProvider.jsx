import React from 'react';

class QuoteProvider extends React.Component {
    constructor() {
        super();
        this.preload = window.preload || [
            {
                id: 1,
                quote: "Test (don't see this in prod?)",
            },
        ];
        this.quote = this.preload[0].quote;
    }

    render() {
        const { children } = this.props;
        const childrenWithProps = React.Children.map(children, child =>
            React.cloneElement(child, { quote: this.quote })
        );
        return (<div>{childrenWithProps}</div>);
    }
}

export default QuoteProvider;