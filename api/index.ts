import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import config from "./config";
import linksRouter from "./routes/links";
import Link from "./models/LinkModel";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/links', linksRouter);

app.get('/:url', async (req, res, next) => {
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

const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log('We r online port: ' + port);
  });

  process.on('exit', () => {
    mongoose.disconnect();
    console.log('disconnected');
  });
};

void run();