const app=require('./app')
const connectDatabase=require('./config/database')
const cloudinary = require('cloudinary')
const dotenv=require('dotenv')


process.on('uncaughtException',err=>{
    console.log(err.message)
    console.log("uncaught error")
})

if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })


dotenv.config({path:'backend/config/config.env'})
// console.log(gya)
connectDatabase()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server started on port ${process.env.PORT} in mode ${process.env.NODE_ENV}`)
})


process.on('unhandledRejection',err=>{
    console.log(`ERROR: ${err.stack}`);
    console.log("error big error")
    server.close(()=>{
        process.exit(1)
    })

})