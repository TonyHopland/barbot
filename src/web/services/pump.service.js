import Pump from 'models/pump';

export const getPumps = () =>
  fetch('api/pumps')
    .then((response) => {
      if (response.ok) {
        return response.json()
          .then(pumps =>
            pumps.map(ing => new Pump(ing.id, ing.msPerCl, ing.ingredientId)));
      }
      throw new Error('Could not get Pumps.');
    });

export default {
  getPumps,
};
