import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SubPage from 'components/SubPage';
import { getDrink } from 'services/drink.service';

import style from './drink.style';

class Drink extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      drink: {},
    };
  }

  componentDidMount() {
    getDrink(this.props.match.params.id).then((result) => {
      this.setState({ isLoading: false, drink: result });
    });
  }

  render() {
    const {
      classes,
    } = this.props;
    const {
      isLoading,
      drink,
    } = this.state;

    return (
      <SubPage>
        {isLoading && <CircularProgress />}
        {!isLoading &&
        <Grid container>
          <Grid item md={12} sm={12}>
            <Typography variant="title">
              {drink.name}
            </Typography>
          </Grid>
          <Grid item md={6} sm={12}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={`/resources/${drink.image || 'noimage.png'}`}
              />
            </Card>
            {!!drink.notes &&
              <Typography variant="body1">
                {drink.notes}
              </Typography>
            }
          </Grid>
          <Grid item md={6} sm={12}>
            Ingredient breakdown
          </Grid>
          <Grid item md={6} sm={12}>
            Make controls
          </Grid>
        </Grid>
        }
      </SubPage>
    );
  }
}

Drink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(style)(Drink);
