import express from 'express'
import protectedRoute from '../middleware/protectedRoute.js';
import { createMessage, getLastMessage, getMessage } from '../controllers/messageController.js';

const router = express.Router()

router.post('/',protectedRoute,createMessage)
router.get("/:chatId",protectedRoute,getMessage)
router.get("/last/:chatId",protectedRoute,getLastMessage)

export default router;