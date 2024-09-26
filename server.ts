import express, { Application } from 'express';
import authRouter  from './routes/auth.js';
 import cors from 'cors';
// import dotenv from 'dotenv';
// dotenv.config();


const PORT: number = 3000
const app :Application = express();

app.use(cors());


app.use(express.json());


app.use("/", authRouter);


















app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})



