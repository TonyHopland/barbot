import Size from 'models/size';

export const RECEIVE_SIZES = 'RECEIVE_SIZES';
export const REQUEST_SIZES = 'REQUEST_SIZES';

export const defaultState = [
  new Size(
    0,
    'Shot',
    5,
  ),
  new Size(
    1,
    'Liten',
    25,
  ),
  new Size(
    2,
    'Stor',
    50,
  ),
];
