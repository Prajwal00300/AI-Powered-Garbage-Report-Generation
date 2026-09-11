import express from 'express'
import cors from  'cors'
import dotenv from 'dotenv'
import {connectDb} from './config/db.js'
import citizenRoutes from './routes/citizenRoutes.js'
import reportRoutes from './routes/reportRoutes.js'
dotenv.config();

const app = express()

app.use(express.json())
app.use(cors())

connectDb(); 

app.use('/api/citizen', citizenRoutes); 
app.use('/api/reports', reportRoutes);




const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
    
})
