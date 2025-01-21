import express from 'express'
import { LoginController, SignupController } from '../controllers/authController.js';


const router = express.Router()


router.post('/login',LoginController)
router.post('/signup',SignupController)


export default router;