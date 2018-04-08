import dbProxy from '../proxies/dbProxy';

export const getSizeById = (req, res) =>
  dbProxy.getSizeById(req.params.id)
    .then(size => res.json(size));

export const getAllSizes = (req, res) =>
  dbProxy.getAllSizes()
    .then(sizes => res.json(sizes));

export const createSize = (req, res) => {
  const newSize = req.body;
  // Todo: Validate newSize

  return dbProxy.createSize(newSize)
    .then(size => res.json(size));
};

export const updateSize = (req, res) => {
  const newSize = req.body;
  // Todo: Validate size

  return dbProxy.updateSize(req.params.id, newSize)
    .then(size => res.json(size));
};
export const deleteSize = (req, res) =>
  dbProxy.deleteSize(req.params.id)
    .then(size => res.json(size));

