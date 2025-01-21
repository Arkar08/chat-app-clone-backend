import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Users",
        required:true
    },
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Chats",
        required:true
    },
    meassage:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        default:''
    }
},{timestamps:true})

const Message = mongoose.model("Message",messageSchema)
export default Message;