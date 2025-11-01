import express from 'express'
import cors from 'cors'
import router from './routes/signRouter.js'
import connectDb from './db/db.js'
import dotenv from 'dotenv'
import User from './models/User.js'
import LoginRouter from './routes/loginRouter.js'

dotenv.config()


const app = express()
app.use(cors())
app.use(express.json())


app.use('/', router)
app.use('/', LoginRouter)

app.get('/admin', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/admin/:email', async (req, res) => {
    const email = req.params.email

  try {
    const deletedUser = await User.findOneAndDelete(email);

    if (!deletedUser) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    res.status(200).json({ message: "Kullanıcı silindi", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



app.listen((5000), () => {
    connectDb()
    console.log("Running backend")
})