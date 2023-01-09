import { db } from "../db/connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { queryList } from "../db/queries.js";
import loggerServices from "../services/logger.sevice.js";
dotenv.config();

const logger = new loggerServices("users.controller");


export const getUser = (req,res) => {
  const userId = req.params.userId;
  const q = queryList.GET_USER_QUERY;

  db.query(q,[userId],(err,data)=>{
    if(err) return res.status(500).json(err)

    const {password,...info} = data[0];
    return res.json(info)
  })
}


export const updateUser = (req,res) => {

  const token = req.cookies.accessToken;
  if(!token) return res.status(401).json("Not logged in!")


  jwt.verify(token,process.env.LOG_SECTRE_KEY,(err,userInfo) => {
    if(err) return res.status(403).json("Token is not valid");  
   
    const q = queryList.UPDATE_USER_QUERY;
    db.query(q,[
      req.body.name,
      req.body.city,
      req.body.website,
      req.body.email,
      req.body.profilePi,
      req.body.coverPi,
      userInfo.id],(err,data)=>{
     if(err) res.status(500).json(err)
     if(data.affectedRows > 0) return res.status(200).json("Updated!")
     return res.status(403).json("You can update only your post!")
    });
  });
};




