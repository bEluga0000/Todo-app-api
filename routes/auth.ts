import jwt from "jsonwebtoken";
import express, { json } from 'express';
import { authenticateJwt, SECRET } from "../middleware/";
import { signupInputs } from "../zodValues/authInputs";
import { createUsers } from "../Queries/insertQueries";
import { getMe, getUser, userCheck } from "../Queries/getQueires";

const router = express.Router();

router.post('/signup', async (req, res) => {
    let parsedInput = signupInputs.safeParse(req.body)
    if (!parsedInput.success) {
      return res.status(403).json({
        msg: "error"
      });
    }
    const username = parsedInput.data.username 
    const password = parsedInput.data.password 
    const userExist =await getUser(username)
    if( userExist)
    {
      res.status(401).json({message:'userAlready exist'})
    }
    else
    {
      const userId = await createUsers(username, password)
      console.log(userId)
      const token = jwt.sign({ id: userId }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
    
  });
  
  router.post('/login', async (req, res) => {
    let parsedInput = signupInputs.safeParse(req.body)
    if (!parsedInput.success) {
      return res.status(403).json({
        msg: "error"
      });
    }
    const username = parsedInput.data.username
    const password = parsedInput.data.password 
    const userId = await userCheck(username,password)
    if(userId > 0)
    {
      const token = jwt.sign({ id: userId }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    }
    else
    {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

    router.get('/me', authenticateJwt, async (req, res) => {
      const userId = req.headers["userId"];
      if (userId === undefined || typeof (userId) === "string" || Array.isArray(userId))
      {
        res.status(403).json({message:'UserId error'})
      }
      else
      {
        const userEmail = await getMe(userId)
        if (userEmail == -1) {
          res.status(403).json({ message: 'User not logged in' });
        }
        else if (userEmail == -2) {
          res.status(403).json({ message: 'Id undefined' });
        }
        else {
          res.json({ username: userEmail });
        }
      }
    });

  export default router
