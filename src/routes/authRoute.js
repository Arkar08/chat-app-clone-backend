import express from 'express'
import { getUser, LoginController, LogoutController, SignupController } from '../controllers/authController.js';


const router = express.Router()


router.post('/login',LoginController)
router.post('/signup',SignupController)
router.post('/logout',LogoutController)
router.get("/users/:id",getUser)


export default router;