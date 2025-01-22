import express from 'express'
import protectedRoute from '../middleware/protectedRoute.js';
import {  getConversationUser, postConversation } from '../controllers/chatController.js';

const router = express.Router()


router.post('/',protectedRoute,postConversation)
router.get('/:userId',protectedRoute,getConversationUser)

export default router;