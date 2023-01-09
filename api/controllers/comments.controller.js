import { db } from "../db/connect.js";
import jwt from "jsonwebtoken";
import { dateFormat } from "../util/utility.js";
import { queryList } from "../db/queries.js";
import dotenv from "dotenv";
import loggerServices from "../services/logger.sevice.js";
dotenv.config();

const logger = new loggerServices("comments.controller");

export const getComments = (req,res) =>{


   const q = queryList.GET_COMMENT_QUERY;
   db.query(q,[req.query.postId],(err,data) => {
    if(err) {
      console.log("error :"+err);
      logger.error("Failed to Gets Comments!" + JSON.stringify(err));
      return res.status(500).json(err);  
    }
     return res.status(200).json(data)
   })
  }



  export const addComment = (req,res) =>{

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
     
     const q = queryList.ADD_COMMENT_QUERY;
  
     const values = [
      req.body.desc,
      dateFormat(),
      userInfo.id,
      req.body.postId
     ]
   
     db.query(q,[values],(err,data) => {
      if(err) {
        console.log("error :"+err);
        logger.error("Failed to Add Comment!" + JSON.stringify(err));
        return res.status(500).json(err);
      };
       return res.status(200).json("Comment has been created")
     });
    });
  };


  export const deleteComment = (req,res) =>{

    const token = req.cookies.accessToken;
    if(!token) {
      logger.info("Token is not found!");
      return res.status(401).json("Not logged in!")}
  
    jwt.verify(token,process.env.LOG_SECTRE_KEY,(err,userInfo) => {
     if(err) {
      console.log("error :"+err);
      logger.error("Token is not valid!" + JSON.stringify(err));
      return res.status(403).json("Token is not valid");
      };  
     
     const q = queryList.DELETE_COMMENT_QUERY;
  
     db.query(q,[req.params.id,userInfo.id],(err,data) => {
      if(err) {
        console.log("error :"+err);
        logger.error("Failed to Delete Comment!" + JSON.stringify(err));
        return res.status(500).json(err);
      };
      if(data.affectedRows>0) return res.status(200).json("Comment has been deleted.")
      return res.status(403).json("You can delete only your comment")
     });
    });
  };