import { PropTypes } from 'react';
import classNames from 'classnames';

const DrinkThumb = ({id, name, isAvailable, image, onClick, selected}) => (
  <div className={classNames(
      'drink_thumb',
      {
        'drink_thumb--selected': selected,
        'drink_thumb--unavailable': !isAvailable
      }
    )}
    onClick={onClick}>
      <img style={image ? {backgroundImage: " url(resources/drinks/" + image + "), url(resources/noimage.png)"}: {backgroundImage: "url(resources/noimage.png)"}}/>
      <span className="title">{name}</span>
      <div className="overlay"></div>
  </div>
)


DrinkThumb.propTypes = {
  isAvailable: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
}

export default DrinkThumb;