import {Router} from "express";
import Link from "../models/LinkModel";
import {LinkData} from "../types";
import mongoose from "mongoose";

const linksRouter = Router();

linksRouter.post('/', async (req, res, next) => {
  try {
    const originalUrl = req.body.url;
    const generateShortUrl = () => {
      const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let shortUrl = '';

      for (let i = 0; i < 6; i++) {
        shortUrl += symbols[Math.floor(Math.random() * symbols.length)];
      }
      return shortUrl;
    };

    const data = await Link.find();
    const existShortUrl = data.filter(item => item.shortUrl === generateShortUrl());
    if (existShortUrl.length > 0) {
      generateShortUrl();
    }

    const linkData: LinkData = {
      shortUrl: generateShortUrl(),
      originalUrl,
    };

    const link = new Link(linkData);
    await link.save();
    res.send(link);
  } catch (error) {
    return next(error);
  }
});

export default linksRouter;