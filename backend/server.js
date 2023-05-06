import express from 'express';
import morgan from 'morgan';
import cookie from 'cookie-parser';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import authrouter from './routes/authroutes.js';
import postrouter from './routes/postroutes.js';
import Adminrouter from './routes/adminroutes.js'

dotenv.config()
// initialising express
const app = express()

//middleware to parse input data
app.use(express.json())
//middleware to log http request
app.use(morgan("common"))
//to get browser cookie in req
app.use(cookie())
//to enable cors
// in localhost
app.use(cors({credentials:true,origin:"http://localhost:3000"})) 

// in production 


//app.use(cors({credentials:true,origin:"http://35.154.223.195"})) 

app.use('/api/auth',authrouter)
app.use('/api/post',postrouter)
app.use('/api/admin',Adminrouter)

mongoose.connect(process.env.MONGO_URL,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true,
  }
).then(()=>{
    app.listen(3001,()=>{
        console.log('server is starting...')
    })
}).catch((er)=>{
    console.log(er)
})


