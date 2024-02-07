import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import config from "./config";
import linksRouter from "./routes/links";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.use('/links', linksRouter);

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