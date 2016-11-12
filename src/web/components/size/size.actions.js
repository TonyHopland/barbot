export const REQUEST_SIZES = 'REQUEST_SIZES';
export const RECEIVE_SIZES = 'RECEIVE_SIZES';
export const SELECT_SIZE = 'SELECT_SIZE';

export function selectSize(size) {
  return {
    type: SELECT_SIZE,
    size,
  };
}

function requestSizes() {
  return {
    type: REQUEST_SIZES,
  };
}

function receiveSizes(sizeArray) {
  return {
    type: RECEIVE_SIZES,
    sizes: sizeArray,
    receivedAt: Date.now(),
  };
}

export function fetchSizes() {
  return (dispatch) => {
    dispatch(requestSizes());
    return fetch('api/sizes')
      .then(response => response.json())
      .then(sizeArray => dispatch(receiveSizes(sizeArray)));
  };
}
