import express from "express";
import { getStories,getOneStory,addStory,deleteStory } from "../controllers/stories.controller.js";
const router = express.Router();

router.get("/" , getStories)
router.get("/find/:storyId" , getOneStory)
router.post("/" , addStory)
router.delete("/:id" , deleteStory)


export default router;