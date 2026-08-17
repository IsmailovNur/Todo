import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import config from "./config";
import todosRouter from "./routers/todos";
import usersRouter from "./routers/users";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use('/todos', todosRouter);
app.use('/users', usersRouter);

const run = async () => {
  await mongoose.connect(config.mongoDbUrl);

  app.listen(port, () => {
    console.log("Listening on port " + port);
  });
}

run().catch(e => console.error(e));

