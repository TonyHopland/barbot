import React, { PropTypes } from 'react';


const ModalComponent = ({ children, onClose }) => {
  const className = children
    ? 'modal modal--active'
    : 'modal';

  const closeButton = onClose
    ? <button onClick={onClose} type="button" className="modal__close">X</button>
    : null;

  return (
    <div className={className}>
      <div className="modal__content">
        {closeButton}
        {children}
      </div>
    </div>
  );
};

ModalComponent.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default ModalComponent;
