import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
   // senderId:{
   //  type:mongoose.Schema.Types.ObjectId,
   //  refs:'Users',
   //  required:true
   // },
   // receivedId:{
   //  type:mongoose.Schema.Types.ObjectId,
   //  refs:'Users',
   //  required:true
   // }
   conversations:Array
       
},{timestamps:true})

const Chats = mongoose.model('Chats',ChatSchema)
export default Chats;