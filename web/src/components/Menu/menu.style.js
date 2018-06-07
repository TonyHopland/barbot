import { DRAWER_WIDTH } from 'common/barbot.constants';

const style = theme => ({
  drawerPaper: {
    position: 'relative',
    width: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

export default style;
