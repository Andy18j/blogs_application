const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {UserModel} = require("../model/user.model")
require("dotenv").config()


const register = async (req,res) => {
    try{ 
        const {Username,Avatar,Email,Password}=req.body
        const hashed = await bcrypt.hash(Password,6)
        const newUser = new UserModel({
            Username,Avatar,Email,Password:hashed
        });
           await newUser.save()
           res.status(201).json({msg:"User Has been Registerd SucessFully!!"})
    }
    catch(err){
        console.log(err)
        res.status(501).json({msg:"Something Went Wrong"})
    }
}

const login = async(req,res) => {
    
        try {
            const { Email, Password } = req.body;
            const user = await UserModel.findOne({ Email });
    
            if (!user) {
                return res.status(401).json({ msg: "User not found" });
            }
    
            const isPassword = await bcrypt.compare(Password, user.Password);
    
            if (!isPassword) {
                return res.status(401).json({ msg: "Incorrect Password" });
            }
    
            const token = jwt.sign({ userId: user._id }, process.env.jwt_key);
    
            res
                .header("authorization", token)
                .json({ token, msg: "Login Successful" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: 'Server Error' });
        }
    };

const users = async(req,res) =>{
    try{
        let userId = req.userId;
        const user = await UserModel.findById(userId)
        return res.status(200).json({
            status:true,message:"user are logged",
            user
        })

    }
    catch(err){
        res.status(501).json({msg:'something went wrong'})
    }
}

module.exports = {
    register,login,users
}