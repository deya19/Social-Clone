import { db } from "../db/connect.js";
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
import { queryList } from "../db/queries.js";
import loggerServices from "../services/logger.sevice.js";
dotenv.config();

const logger = new loggerServices("relationShips.controller");

export const getRelationships = (req,res) =>{
   
   const q = queryList.GET_RELATIONSHIPS_QUERY;

   db.query(q,[req.query.followedUserId],(err,data) => {
    if(err) return res.status(500).json(err)
     return res.status(200).json(data.map(relationship=>relationship.followerUserId))
   });
  };


  export const addRelationship = (req,res) =>{

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")
  
    jwt.verify(token,process.env.LOG_SECTRE_KEY,(err,userInfo) => {
     if(err) return res.status(403).json("Token is not valid")  
     
     const q = queryList.ADD_RELATIONSHIPS_QUERY;
  
     const values = [
      userInfo.id,
      req.body.userId
     ]
   
     db.query(q,[values],(err,data) => {
      if(err) return res.status(500).json(err)
       return res.status(200).json("Following.")
     });
    });
  };



  export const deleteRelationship = (req,res) =>{
    
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!")
  
    jwt.verify(token,process.env.LOG_SECTRE_KEY,(err,userInfo) => {
     if(err) return res.status(403).json("Token is not valid")  
     
     const q = queryList.DELETET_RELATIONSHIPS_QUERY;
  
   
     db.query(q,[userInfo.id,req.query.userId],(err,data) => {
      if(err) return res.status(500).json(err)
       return res.status(200).json("Unfollow")
     });
    });
  };