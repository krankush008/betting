import mongoose from "mongoose";
import express from "express";

const app = express()
app.use(express.json())
const mongoURI = 'mongodb://localhost:27017/mydb';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
const userSchema = new mongoose.Schema({
    username:String,
    email:{ type: String, unique: true },
    password:String
}, { collection: 'beetingUsers' })

const BeetingUsersModel = mongoose.model('BeetingUsers', userSchema);
BeetingUsersModel.collection.createIndex({ email: 1 }, { unique: true });

export default BeetingUsersModel