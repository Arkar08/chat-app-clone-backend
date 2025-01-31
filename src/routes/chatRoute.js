import express from 'express'
import protectedRoute from '../middleware/protectedRoute.js';
import { getAllChat, getChat, postChat } from '../controllers/chatController.js';


const router = express.Router()



router.post('/',protectedRoute,postChat)
router.get("/:userId",protectedRoute,getChat)
router.get("/find/:senderId/:receivedId",protectedRoute,getAllChat)

export default router;