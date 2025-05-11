import express from 'express'
import cors from 'cors'
import productRoutes from './Routes/productRoutes.js'
import ConnectBD from './Config/databaseConfig.js';
import dotenv from 'dotenv'
import { errorHandler } from './Middleware/errorHandleMiddleware.js';

dotenv.config()

const PORT = process.env.PORT

const app = express();

ConnectBD()

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/api/products',productRoutes)

app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`serveris running on port ${PORT}`)
})