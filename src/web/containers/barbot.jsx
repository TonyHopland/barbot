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
      return(
        <div>
          <div><h1>Barbot</h1><span className="settings">settings</span></div>
        <div className="absolute-fill">
          <SlidePanel>
            <DrinkDetail drink={selectedDrink}></DrinkDetail>
            <div className="btn center bottom"> Make drink </div>
          </SlidePanel>
          <div className="flex_container">
            {drinks.map((drink, i) =>
              <DrinkThumb key={drink.id} image={drink.image} name={drink.name} isAvailable={drink.missingIngredients == 0} onClick={this.clickDrink.bind(this, drink.id)} selected={drink.selected} />
            )}
          </div>
        </div>
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