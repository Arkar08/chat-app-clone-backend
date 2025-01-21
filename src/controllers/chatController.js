import Chats from "../models/ChatSchema.js";

export const postConversation = async(req,res)=>{
    const senderId = req.user._id;
    const {receivedId} = req.body;

    try {
        const findChat = await Chats.findOne({ members: { $all: [senderId, receivedId] } })
        if(findChat){
            return res.status(400).json('already exists.')
        }
        const newChat = await Chats.create({
            members:[senderId, receivedId]
        })
        return res.status(201).json(newChat)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const getConversationUser = async(req,res)=>{
    const userId = req.params.id;
    try {
        const findCoversation = await Chats.find({
            members:{$in:[userId]}
        })
        if(!findCoversation){
            return res.status(404).json('User does not exist.')
        }
        return res.status(200).json(findCoversation)
    } catch (error) {
        return res.status(500).json(error)
    }
}