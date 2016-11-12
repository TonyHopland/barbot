import React, { PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { toggleSlidepanel } from '../barbot.actions';

const SlidePanel = ({ children, slidepanelOpen, dispatchToggleSlidepanel }) => (
  <div
    id="slide_panel"
    className={classNames({
      slide_panel: true,
      'slide_panel--open': slidepanelOpen,
    })}
  >
    <div className="toggle_button" onClick={dispatchToggleSlidepanel}>
      <div className="toggle_button__tab" />
    </div>
    <div className="slide_panel__content">{children}</div>
  </div>
);

SlidePanel.propTypes = {
  slidepanelOpen: PropTypes.boolean,
  dispatchToggleSlidepanel: PropTypes.function,
  children: PropTypes.node,
};

const mapStateToProps = ({ barbot }) => ({
  slidepanelOpen: barbot.slidepanelOpen,
});

const mapDispatchToProps = dispatch => ({
  dispatchToggleSlidepanel: action => dispatch(toggleSlidepanel(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SlidePanel);
