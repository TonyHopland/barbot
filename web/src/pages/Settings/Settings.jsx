import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import { getDrinks } from 'services/drink.service';


class Settings extends Component {
  constructor() {
    super();
    this.state = {
      drinks: [],
    };
  }

  componentDidMount() {
    getDrinks().then((result) => {
      this.setState({ drinks: result });
    });
  }

  render() {
    return (
      <BasePage
        title="Barbot - Settings"
      >
        <div>
          {this.state.drinks.map(drink => (
            <div key={drink.id}>
              {drink.name}
            </div>
          ))}
        </div>
      </BasePage>
    );
  }
}

export default Settings;
