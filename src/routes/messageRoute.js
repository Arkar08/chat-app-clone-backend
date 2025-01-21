import express from 'express'
import protectedRoute from '../middleware/protectedRoute.js';
import { createMessage, getMessage } from '../controllers/messageController.js';

const router = express.Router()

router.post('/',protectedRoute,createMessage)
router.get("/:chatId",protectedRoute,getMessage)

export default router;