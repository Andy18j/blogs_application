const express = require("express")
const blogcontroller = require("../controller/blogs.controller")
const blogRouter = express.Router()
const auth = require("../Auth/auth")


blogRouter.get("/",blogcontroller.namaste)
  blogRouter.get("/blogs",blogcontroller.getallblogs)
  blogRouter.get("/blogs/:id",blogcontroller.oneblog)
  blogRouter.get("/blogs/search",blogcontroller.searchBlogs)
  blogRouter.get("/blogs/filter",auth,blogcontroller.filterAndSortBlogs)
  blogRouter.post("/blogs",auth,blogcontroller.createBlog)
  blogRouter.put("/blogs/:id",auth,blogcontroller.updateBlog)
  blogRouter.patch("/blogs/:id/like",auth,blogcontroller.likeBlog)
  blogRouter.patch("/blogs:id/comment",auth,blogcontroller.commentOnBlog)
  blogRouter.delete("/blogs/:id",auth,blogcontroller.deleteBlog)



module.exports = {
    blogRouter
}