import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
// import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import indigo from '@material-ui/core/colors/indigo';
import red from '@material-ui/core/colors/red';
// import Button from '@material-ui/core/Button';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { getDrinkLink } from 'common/links';
import {
  isAvailable,
  getIngredients,
} from 'utils/drink.util';


const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: indigo[200],
  },
  subheader: {
    color: red[900],
  },
});

class DrinkCard extends React.Component {
  constructor() {
    super();
    this.state = { expanded: false };
  }

  handleExpandClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const {
      classes,
      drink,
      location,
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label={drink.name} className={classes.avatar}>
              {drink.name[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={drink.name}
          subheader={!isAvailable(drink) && 'Missing ingredients'}
          classes={{ subheader: classes.subheader }}
        />
        <CardMedia
          className={classes.media}
          image={`/resources/${drink.image}`} // This gets overridden by the line beneath so we can show backup image
          style={{ backgroundImage: `url(/resources/${drink.image}), url(/resources/noimage.png)` }}
          title={drink.name}
          component={NavLink}
          to={getDrinkLink(location, drink.id)}
        />
        <CardContent>
          <Typography component="p">
            {drink.notes}
          </Typography>
        </CardContent>
        {/*
        <CardActions className={classes.actions} disableActionSpacing>
          <Button color="primary">
            Open
          </Button>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={() => this.handleExpandClick()}
            aria-expanded={this.state.expanded}
            aria-label={this.state.expanded ? 'Show less' : 'Show more'}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        */}
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ingredients</TableCell>
                  <TableCell numeric>Amount</TableCell>
                  <TableCell numeric>Missing</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getIngredients(drink).map(ingredient => (
                  <TableRow key={ingredient.id}>
                    <TableCell component="th" scope="row">
                      {ingredient.name}
                    </TableCell>
                    <TableCell numeric>{ingredient.amount}</TableCell>
                    <TableCell>{ingredient.available ? '' : 'X' }</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

DrinkCard.propTypes = {
  drink: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(DrinkCard);
