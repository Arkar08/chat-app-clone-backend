import express from 'express'
import { LoginController, LogoutController, SignupController } from '../controllers/authController.js';


const router = express.Router()


router.post('/login',LoginController)
router.post('/signup',SignupController)
router.post('/logout',LogoutController)


export default router;