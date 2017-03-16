import ReactDOM from 'react-dom';
import Quote from './Quote';
import React from 'react';

window.addEventListener('DOMContentLoaded', () => {
  const quote = document.getElementById('quote_component');
  if (quote) {
    ReactDOM.render(
      <Quote />,
      quote
    );
  }
}, false);
