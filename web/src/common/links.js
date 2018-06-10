const createLinkState = (index, location) => ({
  index,
  transition: location.state && location.state.index > index ? 'back' : 'forward',
});

export const links = {
  drinkList: '/drinks',
  create: '/create',
  settings: '/settings',
};


export const getDrinkListLink = location => ({
  pathname: links.drinkList,
  state: createLinkState(0, location),
});

export const getCreateLink = location => ({
  pathname: links.create,
  state: createLinkState(1, location),
});

export const getSettingsLink = location => ({
  pathname: links.settings,
  state: createLinkState(1, location),
});
