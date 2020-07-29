import React, {Component} from 'react';
import katex from 'katex';

class Katex extends Component {
  componentDidMount() {
    katex.render('c = \\pm\\sqrt{a^2 + b^2}', document.getElementById('katex'));
  }
  render() {
    return <div id='katex'></div>;
  }
}

export default Katex;
