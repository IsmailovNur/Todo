import { Router } from "express";
import { RequestWithUser } from "../types";
import { Todo } from "../models/Todo";
import { auth } from "../middlewares/auth";

const todosRouter = Router();

todosRouter.post('/', auth, async (req: RequestWithUser, res) => {
  try {
    const title = req.body.title?.trim();
    const description = req.body.description?.trim();

    if (!title) return res.status(400).send({error: "Missing title!"});

    const todo = new Todo({
      user: req.user!._id,
      title,
      description: description || '',
      status: req.body.status || 'new',
    });

    await todo.save();
    res.send(todo);
  } catch (e) {
    if (e instanceof Error) {
      return res.status(400).send({error: e.message});
    }
    return res.status(500).send({error: 'Server error!'});
  }
});

todosRouter.get('/', auth, async (req: RequestWithUser, res) => {
  try {
    const todos = await Todo.find({user: req.user!._id});
    return res.send(todos);
  } catch (e) {
    return res.status(500).send({error: 'Server error!'});
  }
});


todosRouter.put('/:id', auth, async (req: RequestWithUser, res) => {
  try {
    const {id} = req.params;
    const todo = await Todo.findById(id);

    if (!todo) return res.status(404).send({error: 'Todo not found!'});

    if (!todo.user.equals(req.user!._id)) {
      return res.status(403).send({error: 'You cannot edit another users todo!'});
    }

    if (req.body.title !== undefined) {
      const title = req.body.title.trim();
      if (!title) {
        return res.status(400).send({error: 'Title cannot be empty!'});
      }
      todo.title = title;
    }

    if (req.body.description !== undefined) {
      todo.description = req.body.description.trim();
    }

    if (req.body.status !== undefined) {
      if (!['new', 'in_progress', 'complete'].includes(req.body.status)) {
        return res.status(400).send({error: 'Invalid status value!'});
      }
      todo.status = req.body.status;
    }

    await todo.save();
    return res.send(todo);
  } catch (e) {
    return res.status(500).send({error: 'Server error!'});
  }
});

todosRouter.delete('/:id', auth, async (req: RequestWithUser, res) => {
  try {
    const {id} = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).send({error: 'Todo not found!'});
    }

    if (!todo.user.equals(req.user!._id)) {
      return res.status(403).send({error: 'You cannot delete another users todo!'});
    }

    await Todo.deleteOne({_id: id});
    return res.send({message: 'Todo deleted successfully!'});
  } catch (e) {
    return res.status(500).send({error: 'Server error!'});
  }
});

export default todosRouter;