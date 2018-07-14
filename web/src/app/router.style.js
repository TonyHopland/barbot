const animationStyle = {
  position: 'absolute',
  transform: 'translateX(0%)',
  transition: 'all 300ms ease-out',
};

export default () => ({
  container: {
    position: 'relative',
  },
  anFwdEnter: {
    ...animationStyle,
    transform: 'translateX(100%)',
  },
  anFwdEnterActive: {
    ...animationStyle,
  },
  anBckEnter: {
    ...animationStyle,
    transform: 'translateX(-100%)',
  },
  anBckEnterActive: {
    ...animationStyle,
  },
  exit: {
    ...animationStyle,
    zIndex: -1,
  },
  exitActive: {
    ...animationStyle,
    zIndex: -1,
  },
});
