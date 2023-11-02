const jwt = require("jsonwebtoken")
require("dotenv").config()


module.exports = (req,res,next)=>{
    const token = req.header("Authorization")

    if (!token){
        return res.status(444).json({msg:"Token Not Passed"})
    }
    try{
        const decoded = jwt.verify(token,process.env.jwt_key)
        req.userId = decoded.userId
        next()

    }
    catch(err){
        res.status(401).json({msg:"Token Is Not Valid"})
    }
}