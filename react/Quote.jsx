import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const QUOTES = [
  'The look of terror when I told them I found another distributed message broker.',
  'My Mac is definitely warmer than my sandwich right now, there\'s no doubt about that.',
  'Your opinion would be flagged as Timbrook ',
];

class Quote extends React.Component {

  constructor() {
    super();
    this.state = {
      cur: Math.floor(Math.random() * QUOTES.length),
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        cur: (this.state.cur + 1) % QUOTES.length,
      });
    }, 10000);
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName='quote'
        transitionEnterTimeout={1500}
        transitionLeaveTimeout={1500}
      >
        <div className='intro quote' key={this.state.cur}>{QUOTES[this.state.cur]}</div>
      </ReactCSSTransitionGroup>
    );
  }

}

export default Quote;
