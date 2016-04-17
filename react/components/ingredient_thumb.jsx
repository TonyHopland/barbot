import { PropTypes } from 'react';
import classNames from 'classnames';

const IngredientThumb = ({name, isAvailable, image, color}) => (
  <div className={classNames(
      'ingredient_thumb',
      {
        'ingredient_thumb--unavailable': !isAvailable
      }
    )} style={{'backgroundColor': color}} >
    <img style={image ? {backgroundImage: " url(resources/ingredient/" + image + "), url(resources/noimage.png)"}: {backgroundImage: "url(resources/noimage.png)"}}/>
    <span className="title" style={{backgroundColor: color}}>{name}</span>
    <div className="overlay"></div>
  </div>
)


IngredientThumb.propTypes = {
  isAvailable: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default IngredientThumb;
