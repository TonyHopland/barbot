import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import { getDrinks } from 'services/drink.service';


class Make extends Component {
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
        title="Barbot - Make drink"
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

export default Make;
