const mongoose = require("mongoose")


const BlogSchema = new mongoose.Schema({
    title : {type:String,required:true},
    content:{type:String,required:true},
    category : {
        type:String,
        enum : ["Business","Tech","Lifestyle","Entertainment"],
        required : true
    },
    date : {type:Date,default:Date.now},
    likes : {type:Number,default:0},
    Comments : {username:String,content:String}
})

const blogsModel = mongoose.model("blogs",BlogSchema)

module.exports = {
    blogsModel
}