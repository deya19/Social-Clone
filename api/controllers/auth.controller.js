import { db } from "../db/connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { queryList } from "../db/queries.js";
import {isValidEmail, isValidPassword} from "../util/validation.js";
import dotenv from "dotenv";
import loggerServices from "../services/logger.sevice.js";
import { actionList } from "../audit/auditAction.js";
import { dateFormat } from "../util/utility.js";
import { prepareAudit } from "../audit/auditService.js";
dotenv.config();

//Winston Logger
const logger = new loggerServices("auth.controller");

export const register =(req,res)=>{
  
    const auditOn = dateFormat();
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
  
    
    //validate is not empty
    if (!username || !password || !email || !name) {
      return res
        .status(500)
        .send({ error: " Please fills every rows" });
    };


  // Validation: 1) username or email not exist  2) is email 3) validate password strength
  const q = queryList.GET_USER_NAME;
  db.query(q,[username], (err,data) =>{
    console.log("data :" +JSON.stringify(data));

    if(err){
      console.log("Error: " + err);
      let errorMessage = "user was created" + err;
      prepareAudit(
        actionList.ADD_NEW_USER,
        null,
        JSON.stringify(errorMessage),
        name,
        auditOn
      );
      return res.status(500).send("Something was wrong");
    }

    if(data.length) return res.status(409).json("User already exists!");

    if(!isValidEmail(email)){
      return res
      .status(500)
      .send({ error: "Email is not valid " });
     }

     if(!isValidPassword(password)){
      return res
      .status(500)
      .send({ error: "Password is not valid " });
     }
        
       const salt = bcrypt.genSaltSync(10);
       const hashedPassword = bcrypt.hashSync(password,salt)


       const q = queryList.INSERT_USER_NAME;
       const values = [username,email,hashedPassword,name] ;
       db.query(q,[values], (err,data) => {
        if(err){
          console.log("Error: " + err);
          prepareAudit(
            actionList.ADD_NEW_USER,
            null,
            JSON.stringify(errorMessage),
            name,
            auditOn
          );
          return res.status(500).send("Failed to add new user!");
        }
        prepareAudit(
          actionList.ADD_NEW_USER,
          data,
          null,
          name,
          auditOn
        );
        return res.status(201).json("User has been created.")
       });
  });
};


export const login =(req,res)=>{
  const auditOn = dateFormat();
  const {username,password} = req.body;

  // 1) validate is not empty 2) get user by username 3) compare password 4) get user roles  5) generate token
  if(!username || !password){
      return res
        .status(500)
        .send({ error: "username, password are required" });
  }
   

  const q = queryList.GET_USER_NAME;
  db.query(q,[username],(err,data) => {

    if(err){
      console.log("error :"+err);
      logger.error("Failed to SignIn! , invalid username or password" + JSON.stringify(err));
      prepareAudit(
        actionList.GET_NAME_OF_USER,
        null,
        JSON.stringify(errorMessage),
        username,
        auditOn
      );
      return res.status(500).send({ error: "Failed to SignIn! , invalid username or password" });
    };
     

    if(data.length === 0) {
      logger.info("user : ["+username+"] not exists in db");
      return res.status(401).json("Invalid username or password")
    };


    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
    if(!checkPassword) {
      logger.info("Invalid password");
      return res.status(401).json("wrong password or username")
    };

    const token = jwt.sign({id:data[0].id},process.env.LOG_SECTRE_KEY) //to check when delete or update is my post
    const {password, ...others} = data[0]; // to return every thing without password

    prepareAudit(
      actionList.GET_NAME_OF_USER,
      data,
      null,
      username,
      auditOn
    );

    const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000;
    res.cookie(process.env.SIGN_TOKEN, token,{
      httpOnly:true,
      maxAge:threeDaysInMilliseconds,
      //expires:new Date(Date.now()+900000);
      secure:true,
    }).status(200).json({others,token});
  });
};


export const logout =(req,res)=>{
  try {
    res.clearCookie(process.env.SIGN_TOKEN,{
      sameSite:"none",
      secure:true,
    }).status(200).json("User has been logged Out");
  } catch (error) {
     console.log("error: "+error);
     logger.error("Failed to LogOut!" + JSON.stringify(err));
     return res.status(500).send("Not logged out please try again in anithe time!")
  }
}