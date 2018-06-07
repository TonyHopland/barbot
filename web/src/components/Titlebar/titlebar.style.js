import { DRAWER_WIDTH } from 'common/barbot.constants';

const style = theme => ({
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginRight: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
  menuTitle: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
});

export default style;
