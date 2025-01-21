import Chats from "../models/ChatSchema.js";
import Users from "../models/UserSchema.js";

export const postConversation = async(req,res)=>{
    const senderId = req.user._id;
    const {contact} = req.body;

    try {
        const receivedId = await Users.findOne({contact:contact})
        const findChat = await Chats.findOne({ members: { $all: [senderId, receivedId._id] } })
        if(findChat){
            return res.status(400).json({message:'conversation already exists.'})
        }
        const newChat = await Chats.create({
            members:[senderId, receivedId._id]
        })
        const postData = {
            success:true,
            status:201,
            data:newChat
        }
        return res.status(201).json(postData)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

export const getConversationUser = async(req,res)=>{
    const userId = req.params.userId
    try {
        const findCoversation = await Chats.find({})
        const mapConversation = findCoversation?.filter((conversation)=>{
            if(conversation.members[0] == userId){
                return conversation
            }
        })

        if (findCoversation.length === 0) {
            return res.status(404).json({ message: 'No conversations found for this user.' });
        }
        const getData ={
            success:true,
            status:200,
            data:mapConversation
        }
        return res.status(200).json(getData)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}