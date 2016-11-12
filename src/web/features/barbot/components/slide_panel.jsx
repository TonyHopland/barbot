import { PropTypes } from 'react';
import { toggleSlidepanel } from '../barbot.actions.js';
import classNames from 'classnames';
import { connect } from 'react-redux';

const SlidePanel = ({children, slidepanelOpen, toggleSlidepanel}) => (
  <div id="slide_panel" className={classNames("slide_panel",{'slide_panel--open': slidepanelOpen})}>
    <div className="toggle_button" onClick={toggleSlidepanel}>
      <div className="toggle_button__tab"></div>
    </div>
    <div className="slide_panel__content">{children}</div>
  </div>
)

const mapStateToProps = (state) => {
  const {slidepanelOpen} = state;
  return {
    slidepanelOpen
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSlidepanel: (action) => dispatch(toggleSlidepanel(action))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SlidePanel);
