import { PropTypes } from 'react';
import classNames from 'classnames';

const SlidePanel = ({children}) => (
  <div id="slide_panel" className="slide_panel">
    <div className="toggle_button" onClick={() => document.getElementById('slide_panel').classList.toggle('slide_panel--open')}></div>
    <div className="slide_panel__content">{children}</div>
  </div>
)

export default SlidePanel;
