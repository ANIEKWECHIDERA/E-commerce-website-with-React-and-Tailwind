import React, { useContext } from "react";
import { blogAssets, blogData } from "../assets/blog/blogData";
import NewsLetterBox from "../components/NewsLetterBox";
import BlogTab from "../components/BlogTab";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Blog = () => {
  const { products } = useContext(ShopContext);
  return (
    <div>
      <div className="w-full py-8">
        <h1 className=" text-3xl text-center text-gray-700 font-medium">
          Welcome To Our Blog
        </h1>
      </div>

      <div className="w-full border flex items-center justify-around p-3 mb-8">
        <img className="w-20 text-gray-600" src={blogAssets.blog_bg} alt="" />
        <h2>
          Explore the Latest <br /> Fashion Trends
        </h2>
      </div>

      <div className="flex justify-between items-center">
        <div className="w-[135px] border py-2 px-1 rounded-md flex items-center text-center justify-between">
          <button className="text-center">Recent Articles</button>
          <img className="w-2  items-end" src={assets.dropdown_icon} alt="" />
        </div>

        <div className=" w-[135px] border py-2 px-1 rounded-md flex items-center text-center justify-between">
          <button className="text-center">Topics</button>
          <img className="w-2  items-end" src={assets.dropdown_icon} alt="" />
        </div>
      </div>

      <hr />

      <div>
        {blogData.map((blog, index) => (
          <BlogTab
            key={index}
            img={blog.img}
            title={blog.title}
            description={blog.description}
          />
        ))}

        <NewsLetterBox />
      </div>
    </div>
  );
};

export default Blog;
