import express from 'express'
import { signUp } from '../controller/signControl.js'

const router = express.Router()

router.post("/Signup", signUp)


export default router