import express from 'express'
import { login } from '../controller/loginControl.js'

const LoginRouter = express.Router()

LoginRouter.post("/login", login)


export default LoginRouter