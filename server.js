import express from "express"
import dotenv from "dotenv";
import router from "./routes/auth-routes.js";
import authMiddleware from "./middleware/auth-middleware.js";
import isAdmin from "./middleware/admin-middleware.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

const port = process.env.PORT;

//middlewares
app.use(express.json())

app.use('/api',router);

app.get("/", authMiddleware,(req, res) => {
  const { userId, username, role } = req.userInfo;

  return res.status(200).json({
    message: `Hello ${username}!`,
    userId,
    role
  });
});

app.get("/adminpage",authMiddleware,isAdmin,(req,res)=>{
  const { userId, username, role } = req.userInfo;

  return res.status(200).json({
    message: `Hello ${username} you are an admin!`,
    userId,
    role
  });
})

app.get("/ping", (req, res) => {
  res.send("pong!!!!!!");
});

app.listen(port,()=>{
    console.log(`server running on ${port}`);
})
