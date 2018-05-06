
export const getDrinks = () =>
  fetch('api/recipe')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Could not get drinks.');
    });

export default {
  getDrinks,
};
