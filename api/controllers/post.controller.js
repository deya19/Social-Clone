import { db } from "../db/connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { dateFormat } from "../util/utility.js";
import { queryList } from "../db/queries.js";
import loggerServices from "../services/logger.sevice.js";
dotenv.config();

const logger = new loggerServices("post.controller");

export const getPosts = (req,res) =>{

  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in!")

  jwt.verify(token,process.env.LOG_SECTRE_KEY,(err,userInfo) => {
   if(err) return res.status(403).json("Token is not valid")  
   
   ///to see only the post from user that i following without my post 
  //  const q = `SELECT p.*, u.id AS userId, name, profilePi FROM posts AS p JOIN users AS u ON (u.id = p.userId)
  //  JOIN relationships AS r ON (p.userId = r.followedUserId AND r.followerUserId = ?)`

  ///to see the post from user that i following and post that i created and the arrange it from the of created
   const q = userId !=="undefined"
   ? queryList.GET_PERSONAL_POST
   :
   queryList.GET_PERSONALPOST_WITH_FOLLOWER_POST;
 
   const values = userId !=="undefined" ? [userId] : [userInfo.id,userInfo.id]  // when using condition inside value , remove [] inside db.query

   db.query(q,values,(err,data) => {
    if(err){
      return res.status(500).send(err)
    }
     return res.status(200).json(data)
   })

  })

}



export const addPost = (req,res) =>{

  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in!")

  jwt.verify(token,process.env.LOG_SECTRE_KEY,(err,userInfo) => {
   if(err) return res.status(403).json("Token is not valid")  
   
   const q = queryList.ADD_POST_QUERY;

   const values = [
    req.body.desc,
    req.body.img,
    dateFormat(),
    userInfo.id,
   ]
 
   db.query(q,[values],(err,data) => {
    if(err) return res.status(500).json(err)
     return res.status(200).json("Post has been created")
   });
  });
};


export const deletePost = (req,res) =>{

  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in!")

  jwt.verify(token,process.env.LOG_SECTRE_KEY,(err,userInfo) => {
   if(err) return res.status(403).json("Token is not valid")  
   
   const q = queryList.DELETE_POST_QUERY;

   
   db.query(q,[req.params.id,userInfo.id],(err,data) => {
    if(err) return res.status(500).json(err)
    if(data.affectedRows>0) return res.status(200).json("Post has been deleted.")
    return res.status(403).json("You can delete only your post")
   });
  });
};


