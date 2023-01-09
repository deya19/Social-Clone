import { db } from "../db/connect.js";
import jwt from "jsonwebtoken";
import { queryList } from "../db/queries.js";
import dotenv from "dotenv";
import loggerServices from "../services/logger.sevice.js";
dotenv.config();

const logger = new loggerServices("Likes.controller");

export const getLikes = (req,res) =>{
   
   const q = queryList.GET_LIKES_QUERY;

   db.query(q,[req.query.postId],(err,data) => {
    if(err) {
      console.log("error :"+err);
      logger.error("Failed to Gets Comments!" + JSON.stringify(err));
      return res.status(500).json(err);  
    }
     return res.status(200).json(data?.map(like=>like.userId))
   });
  };


  export const addLike = (req,res) =>{

    const token = req.cookies.accessToken;
    if(!token) {
      logger.info("token is not found");
      return res.status(401).json("Not logged in!")
    };

    jwt.verify(token,process.env.LOG_SECTRE_KEY,(err,userInfo) => {
      if(err) {
        console.log("error :"+err);
        logger.error("Token is not valid" + JSON.stringify(err));
        return res.status(403).json("Token is not valid");
      };    
     
     const q = queryList.ADD_LIKE_QUERY;
  
     const values = [
      userInfo.id,
      req.body.postId
     ]
   
     db.query(q,[values],(err,data) => {
      if(err) {
        console.log("error :"+err);
        logger.error("Failed to Add Likes!" + JSON.stringify(err));
        return res.status(500).json(err);
      };
       return res.status(200).json("Post has been liked.")
     });
    });
  };



  export const deleteLike = (req,res) =>{
    
    const token = req.cookies.accessToken;
    if(!token) {
      logger.info("Token is not found!");
      return res.status(401).json("Not logged in!");
    };
  
    jwt.verify(token,process.env.LOG_SECTRE_KEY,(err,userInfo) => {
      if(err) {
        console.log("error :"+err);
        logger.error("Token is not valid!" + JSON.stringify(err));
        return res.status(403).json("Token is not valid");
      };  
     
     const q = queryList.DELETE_LIKE_QUERY;
  
   
     db.query(q,[userInfo.id,req.query.postId],(err,data) => {
      if(err) return res.status(500).json(err)
       return res.status(200).json("Post has been disliked")
     });
    });
  };