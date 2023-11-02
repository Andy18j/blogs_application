const {blogsModel} = require("../model/blogs.model")


exports.namaste = async (req, res) => {
    try {
      res.status(200).json("welcome to blog App");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error" });
    }
  };
  
exports.getallblogs = async (req,res) => {
    try {
        const blogs = await blogsModel.find()
        res.status(201).json(blogs)

    }
    catch(err){
        res.status(401).json({msg:"error"})
        console.log(err)
    }
}

exports.oneblog =async (req,res) =>{
    try{
        const blog = await blog.findById(req.params.id)
        return res.status(200).json({status:true,blog})

    }
    catch(err){
        console.log(err)
        return res.status(401).json({msg:"error"})
    }
}



exports.createBlog = async (req, res) => {
    try {
      const { title, content, category, date } = req.body;
      const userId = req.userId;
      const blog = new blogsModel({ title, content, category, date, userId });
      await blog.save();
      res.status(201).json({ message: "Blog created successfully", blog });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error" });
    }
  };
  
  exports.updateBlog = async (req, res) => {
    try {
      const { title, content, category } = req.body;
      const blogId = req.params.id;
      const updatedBlog = await blogsModel.findByIdAndUpdate(
        blogId,
        { title, content, category },
        { new: true }
      );
      if (!updatedBlog) {
        return res.status(404).json({ error: "Blog not found for update" });
      }
      res.status(201).json({ message: "Blog updated successfully", updatedBlog });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error" });
    }
  };
  
  exports.deleteBlog = async (req, res) => {
    try {
      const blogId = req.params.id;
      const deletedBlog = await blogsModel.findByIdAndDelete(blogId);
      if (!deletedBlog) {
        return res.status(404).json({ error: "Blog not found for delete" });
      }
      res.status(201).json({ message: "Blog deleted successfully", deletedBlog });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error" });
    }
  };
  
  exports.likeBlog = async (req, res) => {
    try {
      const blogId = req.params.id;
      const updatedBlog = await blogsModel.findByIdAndUpdate(
        blogId,
        { $inc: { likes: 1 } },
        { new: true }
      );
      if (!updatedBlog) {
        return res.status(404).json({ error: "Blog not found for like update" });
      }
      res
        .status(201)
        .json({ message: "Blog likes updated successfully", updatedBlog });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error" });
    }
  };
  

  exports.commentOnBlog = async (req, res) => {
    try {
      const { username, content } = req.body;
      const blogId = req.params.id;
      const updatedBlog = await blogsModel.findByIdAndUpdate(
        blogId,
        { $push: { comments: { username, content } } },
        { new: true }
      );
      if (!updatedBlog) {
        return res
          .status(404)
          .json({ error: "Blog not found for comment update" });
      }
      res
        .status(201)
        .json({ message: "Blog comment updated successfully", updatedBlog });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error" });
    }
  };
  
  exports.searchBlogs = async (req, res) => {
    try {
      const query = req.query.title;
      const searchedBlogs = await blogsModel.find({
        title: { $regex: query, $options: "i" },
      });
      res.json(searchedBlogs);
    } catch (error) {
      res.status(500).json({ error: "Error searching blogs" });
    }
  };
  
  exports.filterAndSortBlogs = async (req, res) => {
    try {
      const category = req.query.category;
      const order = req.query.order;
      const query = {};
      if (category) {
        query.category = category;
      }
      const sortOptions = {};
      if (order) {
        if (order === "1") {
          sortOptions.date = 1;
        } else if (order === "-1") {
          sortOptions.date = -1;
        }
      }
      const filteredAndSortedBlogs = await blogsModel.find(query).sort(sortOptions);
      res.json(filteredAndSortedBlogs);
    } catch (error) {
      res.status(500).json({ error: "Error filtering and sorting blogs" });
    }
  };
  