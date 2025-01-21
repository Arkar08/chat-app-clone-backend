import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Users",
        required:true
    },
    receivedId:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Users",
        required:true
    },
    meassage:{
        type:String,
        required:true
    },
    picture:{
        type:String
    }
})

const Message = mongoose.model("Message",messageSchema)
export default Message;