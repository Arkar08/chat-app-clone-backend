import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    email:{
        type:String, 
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    profilePic:{
        type:String,
        default:''
    },
    gender:{
        type:String,
        enum:['Male','Female']
    }
},{timestamps:true})

const Users = mongoose.model('Users',userSchema)
export default Users;