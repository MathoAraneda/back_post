import {    addPost_Internal, 
            deletePost_Internal, 
            getPostById_Internal, 
            getPosts_Internal 
        } from "../business/posts.js"

export const getPost = async(req, res) => {
    const reponse = await getPosts_Internal();
    return res.status(reponse.codeNumber).json(reponse);
}

export const getPostById = async(req, res) => {
    const { id = 0} = req.params;
    const reponse = await getPostById_Internal(id);
    return res.status(reponse.codeNumber).json(reponse);
}

export const addPost = async(req, res) => {
    const base = req.body;
    const reponse = await addPost_Internal(base);
    return res.status(reponse.codeNumber).json(reponse);
}

export const deletePost = async(req, res) => {  
    const { id = 0} = req.params;
    const reponse = await deletePost_Internal(id);
    return res.status(reponse.codeNumber).json(reponse);   
}