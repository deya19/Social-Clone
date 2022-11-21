import {db} from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getStories = (req,res) =>{
  const token = req.cookies.accessToken;
  if(!token) return res.status(402).json("Not logged in!");

  jwt.verify(token , "secretkey" , (err,userInfo) => { 
    if(err) return res.status(403).json("Token is not valid!");

   const q = `SELECT s.*, name From stories AS s JOIN users u ON (u.id = s.userId) 
   LEFT JOIN relationships AS r ON (s.userId = r.followedUserId and r.followerUserId = ?) LIMIT 4 `;

   db.query(q,[userInfo.id],(err,data) => { 
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
    });

   });
};

export const getOneStory = (req,res) => {
  const storyId = req.params.storyId;
  const q = "SELECT * FROM stories WHERE id = ?";

  db.query(q,[storyId],(err,data)=>{
    if(err) return res.status(500).json(err)

    const {...info} = data[0];
    return res.json(info)
  })
}


export const addStory = (req,res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token,"secretkey",(err,userInfo) => { 
    if (err) return res.status(403).json("Token is not valid");

    const q = "INSERT INTO stories(`img`,`createdAt`,`userId`) VALUES (?)";
    const values = [
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
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

  jwt.verify(token,"secretkey", (err,userInfo) => { 
    if (err) return res.status(403).json("Token is not valid");

    const q = "DELETE FROM stories WHERE `id` = ? AND `userId` = ?";

    db.query(q, [req.params.id,userInfo.id], (err,data) => { 
      if(err) return res.status(500).json(err);
      if(data.affectedRows>0) return res.status(200).json("Users has been deleted.")
      return res.status(403).json("you can delete only your story!")
     })
   })
}