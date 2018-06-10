import React, { Component } from 'react';
import SubPage from 'components/SubPage';
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
      <SubPage>
        <h1>Settings</h1>
        {this.state.drinks.map(drink => (
          <div key={drink.id}>
            {drink.name}
          </div>
        ))}
      </SubPage>
    );
  }
}

export default Settings;
