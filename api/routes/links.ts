import {Router} from "express";

const linksRouter = Router();

linksRouter.post('/', (req, res, next) => {
  try {
    const urlData = req.body.url;
  } catch (error) {
    return next(error);
  }
})