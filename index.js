import cors from "cors";
import express from "express";
import BeetingUsers from './model/user.js';

const app = express()
const port = 8384
app.use(cors())
app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/signup', async(req, res) => {
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
    const userEmail =  req.query.email; 
    const user = await BeetingUsers.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'kindly register and then try logging in' });
    }
    if(user.password!=req.query.password){
      return res.status(404).json({ message: 'wrong password' });
    } 

    return res.status(200).json({ message: 'user found' });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }

})