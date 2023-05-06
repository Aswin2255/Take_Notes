import mongoose from "mongoose";
import Post from "../models/postmodel.js";

/* create */

export const createpost = async (req, res) => {
  try {
    const { post } = req.body.data;
    const newpost = new Post({
      userid: req.user,
      description: post,
    });

    await newpost.save();
    const updatedpost = await Post.find();
    const allpost = await Post.find({ userid: req.user });

    res
      .status(201)
      .json({ status: true, post: allpost, message: "post created" });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: "error" });
  }
};

/* read */

// this will give the whole post in the database
export const getpost = async (req, res) => {
  try {
    const allpost = await Post.find({ userid: req.user });

    res.status(201).json({
      status: true,
      post: allpost,
      message: "succesfully fetched all post",
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(409)
      .json({ status: false, message: "unexpected error occured" });
  }
};

/* update */

// this to update a post
export const Updatepost = async (req, res) => {
  try {
    const { description, postid } = req.body.data;
    console.log(req.body);

    const updatepost = await Post.findByIdAndUpdate(
      postid,
      {
        description: description,
      },
      { new: true }
    );

    const allpost = await Post.find({ userid: req.user });

    res.status(201).json({
      status: true,
      message: "post updated",
      updatedpost: allpost,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error.message });
  }
};
// delete a post
export const deletepost = async (req, res) => {
  try {
    const { id } = req.params;

    const delted = await Post.findByIdAndDelete(id);
    const allpost = await Post.find({ userid: req.user });

    res.status(200).json({
      status: true,
      updatedpost: allpost,
      message: "post deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: false, message: error.message });
  }
};

//this is to save post

// this is to save the user post
