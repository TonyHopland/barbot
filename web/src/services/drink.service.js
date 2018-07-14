
const { hostname, protocol } = window.location;
const apiPort = 1337;

const apiBase = `${protocol}//${hostname}:${apiPort}`;

const drinkUrl = `${apiBase}/api/recipe`;

export const getDrinks = () =>
  fetch(drinkUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Could not get drinks.');
    });

export const getDrink = id =>
  fetch(`${drinkUrl}/${id}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Could not get drink with id ${id}.`);
    });
