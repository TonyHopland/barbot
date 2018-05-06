import React, { Component } from 'react';
import BasePage from 'components/BasePage';
import { getDrinks } from 'services/drink.service';

class Create extends Component {
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
        title="Barbot - Create drink"
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

export default Create;
