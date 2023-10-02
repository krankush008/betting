import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express()
app.use(express.json())
//const mongoURI = 'mongodb://localhost:27017/mydb';
const mongoURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8450;


const connectDB = async ()=> {
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
}

connectDB().then(()=>{
  app.listen(PORT, ()=>{
    console.log('abc Connected to MongoDB:');
  })
})

const userSchema = new mongoose.Schema({
    username:String,
    email:{ type: String, unique: true },
    password:String
}, { collection: 'beetingUsers' })

const BeetingUsersModel = mongoose.model('BeetingUsers', userSchema);
BeetingUsersModel.collection.createIndex({ email: 1 }, { unique: true });

export default BeetingUsersModel