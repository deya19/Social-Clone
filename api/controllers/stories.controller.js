import {db} from "../db/connect.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { queryList } from "../db/queries.js";
import { dateFormat } from "../util/utility.js";
import loggerServices from "../services/logger.sevice.js";
dotenv.config();

const logger = new loggerServices("stories.controller");

export const getStories = (req,res) =>{
  const token = req.cookies.accessToken;
  if(!token) return res.status(402).json("Not logged in!");

  jwt.verify(token , process.env.LOG_SECTRE_KEY , (err,userInfo) => { 
    if(err) return res.status(403).json("Token is not valid!");

   const q = queryList.GET_STORIES_QUERY;

   db.query(q,[userInfo.id],(err,data) => { 
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
    });

   });
};

export const getOneStory = (req,res) => {
  const storyId = req.params.storyId;
  const q = queryList.GET_ONE_STORY_QUERY;

  db.query(q,[storyId],(err,data)=>{
    if(err) return res.status(500).json(err)

    const {...info} = data[0];
    return res.json(info)
  })
}


export const addStory = (req,res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token,process.env.LOG_SECTRE_KEY,(err,userInfo) => { 
    if (err) return res.status(403).json("Token is not valid");

    const q = queryList.ADD_STORY_QUERIE;
    const values = [
      req.body.img,
      dateFormat(),
      userInfo.id,
    ];

    db.query(q,[values],(err,data) => { 
      if (err) return res.status(500).json(err);
      return res.status(200).json("Story has been created.")
     });
   });
};


export const deleteStory = (req,res) =>{
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token,process.env.LOG_SECTRE_KEY, (err,userInfo) => { 
    if (err) return res.status(403).json("Token is not valid");

    const q = queryList.DELETE_STORY_QUERIE;

    db.query(q, [req.params.id,userInfo.id], (err,data) => { 
      if(err) return res.status(500).json(err);
      if(data.affectedRows>0) return res.status(200).json("Users has been deleted.")
      return res.status(403).json("you can delete only your story!")
     })
   })
}