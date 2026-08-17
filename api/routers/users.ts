import { Router } from "express";
import { User } from "../models/User";

const usersRouter = Router();

usersRouter.post("/", async (req, res) => {
  try {
    const username = req.body.username?.trim();
    const password = req.body.password?.trim();

    if (!username || !password) {
      return res.status(400).send({error: 'Username and password cannot be empty!'});
    }

    const user = new User({username, password});
    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send({error: e.message});
    }
    return res.status(500).send({error: 'Server error!'});
  }
});

usersRouter.post("/sessions", async (req, res) => {
  try {
    const username = req.body.username?.trim();
    const password = req.body.password?.trim();

    if (!username || !password) {
      return res.status(400).send({error: 'Username and password cannot be empty!'});
    }

    const user = await User.findOne({username});
    if (!user) {
      return res.status(400).send({error: 'Incorrect Username!'});
    }

    const isMatch = await user.checkPassword(password);

    if (!isMatch) {
      return res.status(400).send({error: 'Incorrect Password!'});
    }

    user.generateToken();
    await user.save();
    return res.send({message: 'Login successful!', user});

  } catch (e) {
    return res.status(500).send({error: 'Server error!'});
  }
});

export default usersRouter;