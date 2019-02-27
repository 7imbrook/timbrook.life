import '../css/quote.scss';

import React from 'react';

const QuoteWiget = (props) => {
    const {quote} = props;
    return (
        <div className='quote'>
            <blockquote>
                {quote}
            </blockquote>
        </div>
    );
};

export default QuoteWiget;