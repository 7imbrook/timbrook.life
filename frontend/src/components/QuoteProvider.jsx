import React from 'react';

class QuoteProvider extends React.Component {
    componentWillMount() {
        this.quote = "They had a look of terror on their face when I told them I found another distributed message broker."
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