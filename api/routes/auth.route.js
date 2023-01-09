import express from "express";
import {login, register, logout} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/login" , login)
router.post("/register" , register)
router.post("/logout" , logout)




export default router;


// const rawBody = require('raw-body');

// app.post('/', (req, res) => {
//   rawBody(req, {
//     length: req.headers['content-length'],
//     limit: '1mb'
//   }, (err, body) => {
//     if (err) return res.end(err.message);

//     // Do something with the body
//     console.log(body);

//     res.end('OK');
//   });
// });