import dbProxy from '../proxies/dbProxy';

export const getPumpById = (req, res) =>
  dbProxy.getPumpById(req.params.id)
    .then(pump => res.json(pump));

export const getAllPumps = (req, res) =>
  dbProxy.getAllPumps()
    .then(pump => res.json(pump));

export const createPump = (req, res) => {
  const newPump = req.body;
  // Todo: Validate newPump

  return dbProxy.createPump(newPump)
    .then(pump => res.json(pump));
};

export const updatePump = (req, res) => {
  const newPump = req.body;
  // Todo: Validate pump

  return dbProxy.updatePump(req.params.id, newPump)
    .then(pump => res.json(pump));
};

export const deletePump = (req, res) =>
  dbProxy.deletePump(req.params.id)
    .then(pump => res.json(pump));
