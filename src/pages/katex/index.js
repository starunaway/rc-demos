import React, {useEffect} from 'react';
import katex from 'katex';

export default () => {
  useEffect(() => {
    katex.render('c = \\pm\\sqrt{a^2 + b^2}', document.getElementById('katex'));
  }, [0]);

  return <div id='katex'></div>;
};
