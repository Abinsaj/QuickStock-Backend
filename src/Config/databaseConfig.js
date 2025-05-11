import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const ConnectBD = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI );
        console.log("Database connected...")

    } catch (error) {
        console.log('Database does not connected', error.message)
    }
}

export default ConnectBD