const express = require("express")
const cors = require("cors")
const bodyparser = require("body-parser")
const {userRouter} = require("./routes/user.routes")
const {blogRouter} = require("./routes/blogs.routes")
const {connection} = require("./config/db")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyparser.json())

app.use("/api",userRouter)
app.use("/api",blogRouter)
app.get("/",(req,res)=>{
    res.send("Home page")
})





app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("DataBase are Connected ")

    }
    catch(err){
        console.log("Not connnected to the DataBase")
    }
    console.log(`port is running at the ${process.env.port}`)
})