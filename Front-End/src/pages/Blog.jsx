import React, { useContext, useState } from "react";
import { blogAssets, blogData } from "../assets/blog/blogData";
import NewsLetterBox from "../components/NewsLetterBox";
import BlogTab from "../components/BlogTab";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Blog = () => {
  const [visible, setVisibility] = useState(false);
  const [visible2, setVisibility2] = useState(false);

  const { products } = useContext(ShopContext);
  return (
    <div>
      <div className="sm:mt-32  w-full py-8">
        <h1 className="prata-regular text-2xl sm:text-4xl text-center text-gray-700 font-medium">
          Welcome To Our Blog
        </h1>
      </div>

      <div
        className="w-full border border-black flex items-center justify-center p-3 bg-cover bg-center"
        style={{ backgroundImage: `url(${blogAssets.blog_bg_black})` }}
      >
        <img
          className="w-40 overflow-hidden  object-fit"
          src={blogAssets.blog_bg}
          alt="blog_img"
        />
        <h2 className=" prata-regular text-white lg:text-3xl">
          Explore the Latest Fashion Trends..
        </h2>
      </div>

      <div className="md:flex md:flex-row-reverse md:justify-between items-start ">
        <div className="md:flex-col md:w-1/4 flex justify-between items-center py-8 md:sticky md:top-40">
          <div className="w-full flex flex-col justify-center md:block md:mb-8">
            <div className="w-[135px] md:w-full border py-2 px-1 rounded-md flex items-center justify-between active:bg-slate-200">
              <button
                onClick={() => {
                  setVisibility(!visible);
                  setVisibility2(false);
                }}
                className=" text-center w-full text-gray-900"
              >
                Recent Articles
              </button>
              <img
                className={`${
                  visible ? "rotate-90" : ""
                } w-2 md:hidden items-end`}
                src={assets.dropdown_icon}
                alt=""
              />
            </div>
            <div
              className={` ${
                visible ? "" : "hidden"
              } absolute top-[400px] bg-slate-50 md:static md:block mt-4 p-2 border rounded`}
              id="recent-articles-content"
            >
              <ul className="list-disc ml-4 text-gray-500 hover:text-gray-700">
                <li className=" mb-3 md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Latest Suit Trends
                </li>
                <li className=" mb-3 md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Accessorizing Your Suit
                </li>
                <li className=" mb-3 md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Blazer Styles for 2024
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center md:block">
            <div className=" w-[135px] md:w-full border py-2 px-1 rounded-md flex items-center justify-between">
              <button
                onClick={() => {
                  setVisibility2(!visible2);
                  setVisibility(false);
                }}
                className="text-center w-full text-gray-900"
              >
                Topics
              </button>
              <img
                className={`${
                  visible2 ? "rotate-90" : ""
                } w-2 md:hidden items-end`}
                src={assets.dropdown_icon}
                alt=""
              />
            </div>
            <div
              className={` ${visible2 ? "" : "hidden"}
               absolute top-[400px] right-4 bg-slate-50 md:static md:block mt-4 p-2 border rounded"
              id="topics-content`}
            >
              <ul className="list-disc ml-4 ">
                <li className=" mb-3 md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Suit Styles & Trends
                </li>
                <li className=" mb-3 md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Shirts & Ties
                </li>
                <li className=" mb-3 md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Blazers & Jackets
                </li>
                <li className=" mb-3 md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Shoes & Accessories
                </li>
                <li className=" mb-3 md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Grooming & Maintenance
                </li>
                <li className=" mb-3 md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer">
                  Corporate Fashion Tips
                </li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="w-full md:hidden" />

        <div className="md:w-2/3 md:grid md:grid-cols-1 md:gap-6 md:gap-y-4 lg:grid-cols-2 ">
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
