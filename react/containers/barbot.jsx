import SlidePanel from '../components/slide_panel.jsx';
import DrinkThumb from '../components/drink_thumb.jsx';
import DrinkDetail from '../components/drink_detail.jsx';
import { fetchDrinks, selectDrink } from '../actions/actions.js';
import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class barbot extends Component {

    componentDidMount() {
      const { dispatch } = this.props;
      dispatch(fetchDrinks());
    };

    componentWillUnmount() {
    };

    clickDrink(id) {
      const { dispatch } = this.props;
      dispatch(selectDrink(id));
    };

    render() {
      const {drinks, selectedDrink} = this.props;
      console.log(selectedDrink);
      return(
        <div>
          <div className="flex_container">
            {drinks.map((drink, i) =>
              <DrinkThumb key={drink.id} image={drink.image} name={drink.name} isAvailable={drink.missingIngredients == 0} onClick={this.clickDrink.bind(this, drink.id)} selected={drink.selected} />
            )}
          </div>
          <SlidePanel>
            <DrinkDetail drink={selectedDrink}></DrinkDetail>
          </SlidePanel>
        </div>
      );
    };
}

barbot.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const {drinks, isFetching, selectedDrink} = state;
  return {
    drinks, isFetching, selectedDrink
  }
}

export default connect(mapStateToProps)(barbot);
