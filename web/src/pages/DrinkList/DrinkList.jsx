import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SubPage from 'components/SubPage';
import Grid from '@material-ui/core/Grid';
import DrinkCard from 'components/DrinkCard';
import LoadingCard from 'components/LoadingCard';
import { getDrinks } from 'services/drink.service';
import { getSortedList } from 'utils/drink.util';


class DrinkList extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      drinks: [],
    };
  }

  componentDidMount() {
    getDrinks().then((result) => {
      this.setState({ isLoading: false, drinks: getSortedList(result) });
    });
  }

  render() {
    return (
      <SubPage>
        <Grid
          container
          alignContent="space-around"
          spacing={24}
        >
          {this.state.isLoading &&
           [1, 2, 3, 4, 5, 6, 7, 8].map(id => (
             <Grid
               key={id}
               item
               xl={2}
               lg={3}
               md={4}
               sm={6}
               xs={12}
             >
               <LoadingCard />
             </Grid>
           ))
          }
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
              <DrinkCard drink={drink} location={this.props.location} />
            </Grid>
          ))}
        </Grid>
      </SubPage>
    );
  }
}

DrinkList.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default DrinkList;
