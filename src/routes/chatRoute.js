import express from 'express'
import protectedRoute from '../middleware/protectedRoute.js';
import { postChat } from '../controllers/chatController.js';
// import {  getAllChat, getConversationUser, postConversation } from '../controllers/chatController.js';

const router = express.Router()


// router.post('/',protectedRoute,postConversation)
// router.get('/:userId',protectedRoute,getConversationUser)
// router.get('/',protectedRoute,getAllChat)

router.post('/',protectedRoute,postChat)

export default router;