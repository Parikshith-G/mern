const express=require('express')
const mongoose=require('mongoose')
const app=express();
const cookieParser=require('cookie-parser')
const dotenv=require('dotenv')
dotenv.config({path:'backend/config/config.env'})
mongoose.set('strictQuery', true);
const errorMiddleware=require('./middlewares/errors')

const products=require('./routes/product')
const auth=require('./routes/auth')
const order=require('./routes/order')
const payment=require('./routes/payment')

const cloudinary=require('cloudinary')
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload')


app.use(fileUpload())
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))



cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})



app.get('/',(req,res)=>{
    res.json({
        message:"tests"
    })
})


app.use('/api/v1',products)
app.use('/api/v1',auth)
app.use('/api/v1',order)
app.use('/api/v1',payment)

app.use(errorMiddleware)
module.exports = app