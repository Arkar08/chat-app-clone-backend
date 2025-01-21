import Message from "../models/MessageSchema.js";

export const createMessage = async(req,res)=>{
    const senderId = req.user._id;
    const {chatId,message,picture} = req.body;
    try {
        const newMessage = await Message.create({
            senderId,
            chatId:chatId,
            meassage:message,
            picture:picture
        })
        const postData = {
            success:true,
            status:201,
            data:newMessage
        }
        return res.status(201).json(postData)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

export const getMessage = async(req,res)=>{
    const chatId = req.params.chatId
    try {
        const findMessage = await Message.find({chatId:chatId})
        if(!findMessage){
            return res.status(404).json({error:'Message not found'})
        }
        const getData= {
            success:true,
            status:200,
            data:findMessage
        }
        return res.status(200).json(getData)
    } catch (error) {
        return res.status(500).json(error)
    }
}