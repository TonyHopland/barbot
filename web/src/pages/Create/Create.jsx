import React, { Component } from 'react';
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
      <div>
        {this.state.drinks.map(drink => (
          <div key={drink.id}>
            {drink.name}
          </div>
        ))}
      </div>
    );
  }
}

export default Create;
