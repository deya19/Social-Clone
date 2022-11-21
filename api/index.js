import express from "express";
const app = express();
import authRoutes from "./routes/auth.js"
import commentRoutes from "./routes/comments.js"
import likeRoutes from "./routes/likes.js"
import postRoutes from "./routes/post.js"
import userRoutes from "./routes/users.js"
import relatioshipRoutes from "./routes/relationships.js"
import storyRoutes from "./routes/stories.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer"

//middlewares
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Credentials",true);
  next();
})
app.use(express.json())
app.use(cors({
  origin:"http://localhost:3000",
}))
app.use(cookieParser())

const storage = multer.diskStorage({
  //path to storage pic in client file
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload') // the place where we add the folder
  },

  // the name that used to storage inside upload file
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname) // to transform the name to uniquename when upload the same name use date
  }
})

//To storage the pic inside public file (upload) in client side
const upload = multer({ storage: storage })

app.post("/api/upload", upload.single("file"),(req,res) => {
  const file = req.file;
  res.status(200).json(file.filename);
 })

app.use("/api/auth" , authRoutes)
app.use("/api/comments" , commentRoutes)
app.use("/api/likes" , likeRoutes)
app.use("/api/posts" , postRoutes)
app.use("/api/relationships" , relatioshipRoutes)
app.use("/api/stories" , storyRoutes)
app.use("/api/users" , userRoutes)



app.listen(8800,() => {
  console.log("API Working!")
})