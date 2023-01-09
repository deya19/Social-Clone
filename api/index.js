import express from "express";
import authRoutes from "./routes/auth.route.js";
import commentRoutes from "./routes/comments.route.js";
import likeRoutes from "./routes/likes.route.js";
import postRoutes from "./routes/post.route.js";
import userRoutes from "./routes/users.route.js";
import relatioshipRoutes from "./routes/relationships.route.js";
import storyRoutes from "./routes/stories.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
import rawBody from "raw-body";
import contentType from "content-type";
import bodyParser from "body-parser";
import hpp from "hpp";
import helmet from "helmet";
import loggerServices from "./services/logger.sevice.js";


//Winston Logger
const logger = new loggerServices("error.control");
const port = process.env.SERVER_PORT;
const app = express();

//setting various HTTP headers
app.use(helmet());

// security vulnerability that occurs when an attacker is able to inject multiple values into a single HTTP request parameter, resulting in unexpected behavior or exploitation of a web application.
app.use(hpp());


//middlewares
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Credentials",true);
  next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// to reduce the lenght of request
app.use((req, res, next) => {
  if (req.readable) {
    // read the request body and attach it to req.text
    rawBody(req, {
      length: req.headers['content-length'],
      limit: '1mb',
      encoding: contentType.parse(req).parameters.charset
    }, (err, string) => {
      if (err) {
        logger.error("the lenght of request too long" + JSON.stringify(err));
        return next(err);
      };
      req.text = string;
      next();
    });
  } else {
    // the request body is not readable, so skip parsing it
    next();
  }
});


app.use(cors({
  origin:"http://localhost:3000",
}));

//It allows you to read, parse, and set cookies in a Node.js application.
app.use(cookieParser());

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



app.listen(port,() => {
  console.log(`Server Start .......... `);
});

export default app;

