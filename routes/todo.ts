import express from 'express';
import { authenticateJwt, SECRET } from "../middleware/index";
import { getClient } from '..';
import { createTodo } from '../Queries/insertQueries';
import { getTodos } from '../Queries/getQueires';
import { updateTodo, updateTodoDone } from '../Queries/updateQueries';
import { deleteTodo } from '../Queries/deleteQueries';
const router = express.Router();

interface CreateTodoInput {
  title: string;
  description: string;
}

router.post('/todos', authenticateJwt,async (req, res) => {
  const { title, description } = req.body;
  const done = false;
  const userId = req.headers["userId"];
  if (userId === undefined || typeof (userId) === "string" || Array.isArray(userId)) {
    res.status(403).json({ message: 'UserId error' })
  }
  else
  {
    const createdTodo =await createTodo(title, description, userId)
    if(createdTodo)
    {
      res.status(201).json({messsage:'Todo created successfully',id:createdTodo})
    }
    else
    {
      res.status(500).json({ error: 'Failed to create a new todo' });
    }
  }
  
});


router.get('/todos', authenticateJwt,async (req, res) => {
  const userId = req.headers["userId"];
  if (userId === undefined || typeof (userId) === "string" || Array.isArray(userId)) {
    res.status(403).json({ message: 'UserId error' })
  }
  else
  {
    const todo = await getTodos(userId)
    if(todo)
    {
      res.status(201).json({todos:todo})
    }
    else
    {
      res.status(500).json({ error: 'Failed to retrieve todos' })
    }
  }
});

router.patch('/todos/:todoId/done', authenticateJwt, async(req, res) => {
  const { todoId } = req.params;
  const numericTodoid = parseInt(todoId)
  if(typeof(numericTodoid)=='string')
  {
    res.status(500).json({ error: 'Failed to update todo1' })
  }
  else
  {
    const userId = req.headers["userId"];
    if (userId === undefined || typeof (userId) === "string" || Array.isArray(userId)) {
      res.status(403).json({ message: 'UserId error' })
    }
    else
    {
      const doneUpdate =await updateTodoDone(numericTodoid, userId)
      if(doneUpdate == -1)
      {
        res.status(500).json({ error: 'Failed to update todo1' })
      }
      else
      {
        res.status(201).json({todo:doneUpdate})
      }
    }
  }
});

router.put('/todos/:todoId',authenticateJwt,async(req,res)=>
{
  const { todoId } = req.params;
  const {title,description} = req.body
  const numericTodoid = parseInt(todoId)
  if (typeof (numericTodoid) == 'string') {
    res.status(500).json({ error: 'Failed to update todo1' })
  }
  else {
    const userId = req.headers["userId"];
    if (userId === undefined || typeof (userId) === "string" || Array.isArray(userId)) {
      res.status(403).json({ message: 'UserId error' })
    }
    else {
      const updatedTodo = await updateTodo(userId,numericTodoid , title, description)
      if(updatedTodo == -1 )
      {
        res.status(401).json({message:'error occure'})
      }
      else
      {
        res.status(201).json({updatedTodo})
      }
    }
  }
})

router.delete('/todos/:todoId',authenticateJwt,async(req,res)=>{
  const { todoId } = req.params;
  const numericTodoid = parseInt(todoId)
  if (typeof (numericTodoid) == 'string') {
    res.status(500).json({ error: 'Failed to update todo1' })
  }
  else {
    const userId = req.headers["userId"];
    if (userId === undefined || typeof (userId) === "string" || Array.isArray(userId)) {
      res.status(403).json({ message: 'UserId error' })
    }
    else {
      const todoDeleted = await deleteTodo(numericTodoid, userId)
      if(todoDeleted == 1)
      {
        res.json({message:'todo deleted successfully'})
      }
      else
      {
        res.status(404).json({message:'error occured'})
      }
    }
  }
})


export default router;
