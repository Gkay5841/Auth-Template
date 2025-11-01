import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connect db")
        
    } catch (error) {
        console.log("Not connect db")
    }
}

export default connectDb