import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import BeetingUsers from './model/user.js';
import mongoose from "mongoose";
dotenv.config();
mongoose.set('strictQuery', false);

const port = 8384 || process.env.PORT

const app = express();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(cors(
  {
     origin: "https://luminous-jelly-76ea42.netlify.app",
     methods: ["POST", "GET"],
     credentials: true
  }
))
app.use(express.json());

app.options('*', (req, res) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ body: "OK" });
  }
});

app.get("/", (req, res) => {
  res.json("hmtyghhfggcghello");
})

app.post('/signup', async(req, res) => {
   console.log("ankush")
    const user = new BeetingUsers({
       username:JSON.parse(req.body.body).username,
       email:JSON.parse(req.body.body).email,
       password:JSON.parse(req.body.body).password
    })

    const alreadyRegisteredUser = await BeetingUsers.findOne({ email: JSON.parse(req.body.body).email });

    if (alreadyRegisteredUser) {
      return res.status(409).json({ message: 'This email is already registered. Kindly login through the login page' });
    }

    await user.save()
    .then(result=>{
      res.status(200).json({
        message: 'user registered'
      })
    })
    .catch(err=>{
      res.status(500).json({
        error:err
      })
    })

})

app.get('/signin', async (req, res) => {
  try {
    console.log("kumar")
    const userEmail =  req.query.email; 
    const user = await BeetingUsers.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'kindly register and then try logging in' });
    }
    if(user.password!=req.query.password){
      console.log("user abc = "+user.password)
      return res.status(404).json({ message: 'wrong password' });
    } 

    return res.status(200).json({ message: 'user found' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }

})