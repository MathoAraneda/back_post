import {  Router } from "express";
import * as controller from "../controllers/posts.controller.js";

const router = Router();

router.get("/v1/posts", controller.getPost);
router.get("/v1/post/:id", controller.getPostById);
router.post("/v1/post", controller.addPost);
router.delete("/v1/post/:id", controller.deletePost);
router.get("/v1/post", controller.getPostByName);

export default router;
