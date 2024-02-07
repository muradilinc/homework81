import {Router} from "express";
import Link from "../models/LinkModel";
import {LinkData} from "../types";

const linksRouter = Router();

linksRouter.post('/', async (req, res, next) => {
  try {
    const originalUrl = req.body.url;
    const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let shortUrl = '';

    for (let i = 0; i < 6; i++) {
      shortUrl += symbols[Math.floor(Math.random() * symbols.length)];
    }

    const linkData: LinkData = {
      shortUrl,
      originalUrl,
    };

    const link = new Link(linkData);
    await link.save();
    res.send(link);
  } catch (error) {
    return next(error);
  }
});

linksRouter.get('/:url', async (req, res, next) => {
  try {
    const results = await Link.findOne({shortUrl: req.params.url});
    if (results) {
      res.status(301).redirect(results.originalUrl);
    } else {
      res.status(404).send({error: "not found!"});
    }
  } catch (error) {
    return next(error);
  }
});

export default linksRouter;