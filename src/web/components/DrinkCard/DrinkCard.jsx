import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DrinkCard = ({
  name,
  image,
  isAvailable,
  children,
  onClick,
}) => {
  let imgEl;
  return (
    <div className="col s12 m6 l4 xl3">
      <div
        className={
          classnames(
            'drink-card card sticky-action blue-grey lighten-5',
            { 'missing-ingredients': !isAvailable },
          )
        }
      >
        <div className="card-image waves-effect waves-block waves-light">
          <img
            alt=""
            className="drink-card__image activator"
            ref={(el) => { imgEl = el; }}
            src={image ? `resources/drinks/${image}` : 'resources/noimage.png'}
            onError={() => { imgEl.src = 'resources/noimage.png'; }}
          />
        </div>
        <div className="drink-card__content card-content">
          <span className="drink-card__content__title card-title activator grey-text text-darken-4">
            {name}
            <i className="material-icons right">more_vert</i>
          </span>
        </div>
        <div className="card-action">
          <button
            className="make-button waves-effect waves-light btn deep-orange darken-1"
            onClick={onClick}
          >
            Make drink
          </button>
          <div className="make-warning activator">
            <i
              className=" material-icons"
            >
              warning
            </i>
            <span className="make-warning__text">
              Ingredients missing
            </span>
          </div>
        </div>
        <div
          className="drink-card__detail card-reveal orange accent-1"
        >
          <span className="drink-card__detail__title card-title grey-text text-darken-4">
            {name}
            <i className="material-icons right">close</i>
          </span>
          <div className="drink-card__detail__content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

DrinkCard.propTypes = {
  // id: PropTypes.number.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

DrinkCard.defaultProps = {
  children: null,
};

export default DrinkCard;
