import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

//configuting cors
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


//to configure/ set middleware 
app.use(express.json({limit: "16kb"}))

//when data coming from url its configuration
app.use(express.urlencoded({extended: true , limit: "16kb"}))


//static configuration-- > come in action when we want to store something like pdf , images etc 
app.use(express.static("public"))


//to configure cookie parser...
app.use(cookieParser())


// IMPORTING routes

import userRouter from "./routes/user.routes.js"

// routes declaration
app.use("/api/v1/users", userRouter)

export {app}

