import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import SlidePanel from './components/slide_panel';
import DrinkThumb from './components/drink_thumb';
import DrinkDetail from './components/drink_detail';
import { fetchDrinks, selectDrink } from './barbot.actions';

class BarbotComponent extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDrinks());
  }

  componentWillUnmount() {
  }

  clickDrink(id) {
    const { dispatch } = this.props;
    dispatch(selectDrink(id));
  }

  render() {
    const {
      drinks,
      selectedDrink,
    } = this.props;
    return (
      <div>
        <div><h1>Barbot</h1><span className="settings">settings</span></div>
        <div className="absolute-fill">
          <SlidePanel>
            <DrinkDetail drink={selectedDrink} />
            <div className="btn center bottom"> Make drink </div>
          </SlidePanel>
          <div className="flex_container">
            {drinks.map(drink =>
              <DrinkThumb
                key={drink.id}
                image={drink.image}
                name={drink.name}
                isAvailable={drink.missingIngredients === 0}
                onClick={this.clickDrink.bind(this, drink.id)}
                selected={drink.selected}
              />,
            )}
          </div>
        </div>
      </div>
    );
  }
}

BarbotComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  drinks: PropTypes.shape([]),
  selectedDrink: PropTypes.shape({}),
};

const mapStateToProps = ({ barbot }) => ({
  drinks: barbot.drinks,
  isFetching: barbot.isFetching,
  selectedDrink: barbot.selectedDrink,
});

export default connect(mapStateToProps)(BarbotComponent);
