import React from 'react';

class QuoteProvider extends React.Component {
    componentWillMount() {
        this.preload = window.preload !== undefined ? window.preload : [
            {
                id: 1,
                quote: "They had a look of terror on their face when I told them I found another distributed message broker.",
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