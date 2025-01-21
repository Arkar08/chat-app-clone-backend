import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    members:Array,
       
},{timestamps:true})

const Chats = mongoose.model('Chats',ChatSchema)
export default Chats;