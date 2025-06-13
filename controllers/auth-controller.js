import User from "../models/User.js";
import connectDB from "../config/db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
class Authentication {
    async register(req, res) {
        try {

            const { username, email, password, role } = req.body;
            await connectDB();
            if (!username || !email || !password) {
                return res.json({ message: "invalid arguments" }).status(500);
            }

            const checkExists = await User.findOne({ $or: [{ username }, { email }] });
            if (checkExists) {
                return res.json({ success: false, message: "user already exists" }).status(400);
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                role: role || 'user'
            })

            await newUser.save();

            if (newUser) {
                return res.status(200).json({ message: "user registered successfully" });
            } else {
                return res.status(404).json({ message: "registration failed" });
            }
        } catch (err) {
            return res.status(404).json({ message: "user registration failed" });
        }
    };

    async login(req, res) {
        try{
            const {username,password} = req.body;
            if(!username || !password){
                return res.json({ message: "invalid arguments" }).status(500);
            }
             
            await connectDB();
            const user = await User.findOne({username});
            if(!user){
                return res.json({message:"user not found"}).status(500);
            }

            const pass =await bcrypt.compare(password,user.password);

            if(!pass){
                return res.json({message:"invalid credentials"}).status(500);
            }

            //create user token
            const accessToken = jwt.sign(
                {
                   userId : user._id,
                   username:user.username,
                   role : user.type
                },process.env.JWT_SECRET_KEY,{
                    expiresIn : '15m'
                }
            )

            return res.status(200).json({message:"token generated success",accessToken});

        }catch(err){
            return res.status(404).json({ message: "login failed"});
        }
    }
}

export default Authentication;
