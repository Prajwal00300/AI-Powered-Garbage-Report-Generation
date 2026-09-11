import mongoose from 'mongoose'

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'garbage_reporting'
        });
        console.log("Database Connected to garbage_reporting"); 
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}
 
 