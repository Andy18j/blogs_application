const express = require("express")
const usercontroller = require("../controller/user.controller")
const auth = require("../Auth/auth")
const userRouter = express.Router()


userRouter.post("/register",usercontroller.register)
userRouter.post("/login",usercontroller.login)
userRouter.get("/users",auth,usercontroller.users)



module.exports = {
    userRouter
}