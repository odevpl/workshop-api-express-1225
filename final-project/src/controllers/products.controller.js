import * as service from "../services/products.service.js";

export const getAll = async (req, res, next) => {
  try {
    const result = await service.getAll(req.query);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const getOne = async (req, res, next) => {
  try {
    const result = await service.getOne(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const create = async (req, res, next) => {
  try {
    const result = await service.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const update = async (req, res, next) => {
  try {
    const result = await service.update(req.params.id, req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const remove = async (req, res, next) => {
  try {
    const result = await service.remove(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
