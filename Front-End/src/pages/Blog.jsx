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

      <div className="w-full border border-black flex items-center justify-around p-3 ">
        <img className="w-20 " src={blogAssets.blog_bg} alt="blog_img" />
        <h2 className="text-gray-800">
          Explore the Latest <br /> Fashion Trends..
        </h2>
      </div>

      <div className="md:flex md:flex-row-reverse md:justify-between items-start ">
        <div className="md:flex-col md:w-1/4 flex justify-between items-center py-8 md:sticky md:top-40">
          <div className="w-full md:mb-8">
            <div className="w-[135px] md:w-full border py-2 px-1 rounded-md flex items-center justify-between">
              <button className=" text-center w-full text-gray-900">
                Recent Articles
              </button>
              <img
                className="w-2 md:hidden items-end"
                src={assets.dropdown_icon}
                alt=""
              />
            </div>
            <div
              className="hidden md:block mt-4 p-2 border rounded"
              id="recent-articles-content"
            >
              <ul className="list-disc ml-4 text-gray-500 hover:text-gray-700">
                <li className=" md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Latest Suit Trends
                </li>
                <li className="md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Accessorizing Your Suit
                </li>
                <li className="md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Blazer Styles for 2024
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full">
            <div className=" w-[135px] md:w-full border py-2 px-1 rounded-md flex items-center justify-between">
              <button className="text-center w-full text-gray-900">
                Topics
              </button>
              <img
                className="w-2 md:hidden items-end"
                src={assets.dropdown_icon}
                alt=""
              />
            </div>
            <div
              className="hidden md:block mt-4 p-2 border rounded"
              id="topics-content"
            >
              <ul className="list-disc ml-4 ">
                <li className="md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Suit Styles & Trends
                </li>
                <li className="md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Shirts & Ties
                </li>
                <li className="md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Blazers & Jackets
                </li>
                <li className="md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Shoes & Accessories
                </li>
                <li className="md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Grooming & Maintenance
                </li>
                <li className="md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Corporate Fashion Tips
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="w-full md:hidden" />

        <div className="md:w-2/3 md:grid md:grid-cols-2 md:gap-20 ">
          <div className="mt-8">
            <div>
              {blogData.map((blog, index) => (
                <BlogTab
                  key={index}
                  img={blog.img}
                  title={blog.title}
                  description={blog.description}
                />
              ))}
            </div>
          </div>
          <div className="mt-8">
            <div>
              {blogData.map((blog, index) => (
                <BlogTab
                  key={index}
                  img={blog.img}
                  title={blog.title}
                  description={blog.description}
                />
              ))}
            </div>
          </div>
          <div className="mt-8">
            <div>
              {blogData.map((blog, index) => (
                <BlogTab
                  key={index}
                  img={blog.img}
                  title={blog.title}
                  description={blog.description}
                />
              ))}
            </div>
          </div>
          <div className="mt-8">
            <div>
              {blogData.map((blog, index) => (
                <BlogTab
                  key={index}
                  img={blog.img}
                  title={blog.title}
                  description={blog.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default Blog;
