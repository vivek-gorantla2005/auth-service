import mongoose, { model } from "mongoose";

const connectDB = async()=>{
    try{
       await mongoose.connect(process.env.MONGODB_URI);
       console.log("DataBase connected successfully");

    }catch(err){
        console.error('error connecting to database',err)
        process.exit(0);
    }
}


export default connectDB;