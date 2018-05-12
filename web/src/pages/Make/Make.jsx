import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import DrinkCard from 'components/DrinkCard';
import { getDrinks } from 'services/drink.service';
import { getSortedList } from 'utils/drink.util';


class Make extends Component {
  constructor() {
    super();
    this.state = {
      drinks: [],
    };
  }

  componentDidMount() {
    getDrinks().then((result) => {
      this.setState({ drinks: getSortedList(result) });
    });
  }

  render() {
    return (
      <Grid
        container
        alignContent="space-around"
        spacing={24}
      >
        {this.state.drinks.map(drink => (
          <Grid
            key={drink.id}
            item
            xl={2}
            lg={3}
            md={4}
            sm={6}
            xs={12}
          >
            <DrinkCard drink={drink} />
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default Make;
