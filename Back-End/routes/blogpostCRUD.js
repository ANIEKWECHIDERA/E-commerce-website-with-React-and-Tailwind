"use strict";

const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const blogPost = require("../models/blogpost");
const router = express.Router();

//configuring multer for file uploads
const upload = multer({ dest: "uploads/" });

// Cloudinary configuration
router.post("/blog", upload.single("media"), async (req, res) => {
  try {
    let imageUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog_media",
        resource_type: "image",
      });
      imageUrl = result.secure_url;
    }

    //create the blog post
    const newBlogPost = new blogPost({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      image: imageUrl || null, // incase of no image
    });

    await newBlogPost.save();
    res.status(201).json({ message: "Blog post saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving blog post" });
  }
});

//Hopefully this should work, fingers crossed

//Get all blog posts
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await blogPost.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog posts" });
  }
});

router.put("/blog/:id", async (req, res) => {
  try {
    const blog = await blogPost.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog post not found" });

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog_media",
        resource_type: "image",
      });
      blog.image = result.secure_url;
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content; // Retain HTML formatting
    blog.tags = req.body.tags || blog.tags;
    blog.updatedAt = Date.now();

    await blog.save();
    res.status(200).json({ message: "Blog post updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog post" });
  }
});

router.delete("/blog/:id", async (req, res) => {
  try {
    const blog = await blogPost.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete blog post." });
  }
});
