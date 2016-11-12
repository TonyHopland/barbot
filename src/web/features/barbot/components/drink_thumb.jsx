import React, { PropTypes } from 'react';
import classNames from 'classnames';

const DrinkThumb = ({ id, maxsize, name, isAvailable, image, onSelect, selected }) => (
  <div
    className={classNames(
      'drink_thumb',
      {
        'drink_thumb--selected': selected,
        'drink_thumb--unavailable': !isAvailable,
      },
    )}
    onClick={() => onSelect(id, maxsize)}
  >
    <img
      role="presentation"
      style={image
        ? { backgroundImage: `url(resources/drinks/${image}), url(resources/noimage.png)` }
        : { backgroundImage: 'url(resources/noimage.png)' }}
    />
    <span className="title">{name}</span>
    <div className="overlay" />
  </div>
);

DrinkThumb.propTypes = {
  id: PropTypes.number.isRequired,
  maxsize: PropTypes.number.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
  selected: PropTypes.bool,
};

export default DrinkThumb;
