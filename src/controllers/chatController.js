// import Chats from "../models/ChatSchema.js";
// import Users from "../models/UserSchema.js";

// export const postConversation = async(req,res)=>{
//     const senderId = req.user._id;
//     const {contact} = req.body;
//     if(!contact){
//         return res.status(404).json({message:'Plz filled out in the form field.'})
//     }

//     try {
//         const receivedId = await Users.findOne({contact:contact})
//         const findChat = await Chats.find({}) 
//         const mapChat = findChat.filter((chat)=>{
//           return chat.senderId.toString() === senderId.toString() 
//         })
//         const filterChat = mapChat.filter((chatList)=>{
//             return chatList.receivedId.toString() === receivedId._id.toString()
//         })
//         if(filterChat.length > 0){
//             return res.status(400).json({message:'conversation already exists.'})
//         }
        
//         const newChat = await Chats.create({
//            senderId:senderId,
//            receivedId:receivedId._id
//         })
//         const postData = {
//             success:true,
//             status:201,
//             data:newChat
//         }
//         return res.status(201).json(postData)
//     } catch (error) {
//         return res.status(500).json({message:error})
//     }
// }

// export const getConversationUser = async(req,res)=>{
//     const userId = req.params.userId;
//     try {
//         const findConversation = await Chats.find({$all :[userId]})
//         console.log(findConversation)
//         const mapConversation = findConversation.map((conversation)=>{
//             return conversation.receivedId
//         })
//         const findUser = await Users.find({_id:mapConversation})
//         const data = findUser.map((user)=>{
//             const userList = user.toObject()
//             delete userList.password;
//             delete userList.__v
//             delete userList.email;
//             delete userList.createdAt;
//             delete userList.updatedAt;
//             return userList;
//         })
       
       
//         const postData ={
//                 success:true,
//                 status:200,
//                 data:data
//             }
//             return res.status(200).json(postData)
//     } catch (error) {
//         return res.status(500).json({message:error})
//     }
// }


// export const getAllChat = async(req,res)=>{
//     try {
//         const allChat = await Chats.find({})
//         if(allChat.length === 0){
//             return res.status(404).json("No conversation in this chat.")
//         }
//         const postData = {
//             success:true,
//             status:200,
//             data:allChat
//         }
//         return res.status(200).json(postData)
//     } catch (error) {
//         return res.status(500).json({message:error})
//     }
// }



import Chats from "../models/ChatSchema.js";
import Users from "../models/UserSchema.js";


export const postChat = async(req,res)=>{
    const {contact} = req.body;
    const senderId = req.user._id;
    try {
        const user = await Users.findOne({contact:contact})
        if(!user){
            return res.status(404).json({message:'contact does not exist'})
        }
        const findChat = await Chats.find({
            conversations:{$all : [user._id,senderId]}
        })
        if(findChat.length > 1){
            return res.status(400).json({message:'conversation is already exist'})
        }
        const newChat = await Chats.create({
            conversations:[user._id,senderId]
        })
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

