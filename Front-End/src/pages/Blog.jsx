import React, { useContext, useEffect, useState } from "react";
import { blogAssets, blogData } from "../assets/blog/blogData";
import NewsLetterBox from "../components/NewsLetterBox";
import BlogTab from "../components/BlogTab";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import axios from "axios";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [visible, setVisibility] = useState(false);
  const [visible2, setVisibility2] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(blogs.length / blogsPerPage); i++) {
    pageNumbers.push(i);
  }
  const [selectedTopic, setSelectedTopic] = useState("All Topics");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        const sortedBlogs = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogs(sortedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, {});

  const recentPosts = blogs.slice(0, 3);

  const scrollToTop = () => {
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  const filteredPosts =
    selectedTopic !== "All Topics"
      ? currentBlogs.filter((blog) => blog.tags.includes(selectedTopic))
      : currentBlogs;

  const postCountByTopic = (topic) => {
    const count = currentBlogs.filter((blog) => blog.tags.includes(topic));
    return count.length;
  };
  const topics = [
    "All Topics",
    "Suit Styles & Trends",
    "Shirts & Ties",
    "Blazers & Jackets",
    "Shoes & Accessories",
    "Grooming & Maintenance",
    "Corporate Fashion Tips",
  ];

  return (
    <div>
      <div className="sm:mt-32  w-full py-8">
        <h1 className="prata-regular text-2xl sm:text-4xl text-center text-gray-700 font-medium">
          <Title text1={"WELCOME TO"} text2={"OUR BLOG"} />
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
                {recentPosts.map((post) => (
                  <li key={post._id} className=" mb-3 ">
                    <Link
                      to={`/blog/${post._id}`}
                      className="md:hover:underline
                     text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
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
                {topics.map((topic) => {
                  const isSelected = topic === selectedTopic;
                  return (
                    <li
                      key={topic}
                      className={`mb-3 md:hover:underline text-gray-500 hover:text-gray-700 cursor-pointer ${
                        isSelected ? "text-gray-700 underline" : ""
                      }`}
                      onClick={() => {
                        setSelectedTopic(topic);
                        setVisibility2(!visible2);
                      }}
                    >
                      {topic}
                      {topic !== "All Topics"
                        ? `  (${postCountByTopic(topic)})`
                        : ""}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <hr className="w-full md:hidden" />

        <div className="md:w-2/3 md:grid md:grid-cols-1 md:gap-6 md:gap-y-4 lg:grid-cols-2 ">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((blog) => (
              <div key={blog._id} className="mt-8 bg-slate-50">
                <BlogTab
                  img={blog.image}
                  title={blog.title}
                  description={`${blog.content.slice(0, 300)}...`}
                  readMore={`/blog/${blog._id}`}
                />
              </div>
            ))
          ) : (
            <div className="mt-8 text-gray-500">
              No posts available for this category.
            </div>
          )}
        </div>
      </div>
      <div className="text-center text-gray-600 mt-10">
        {pageNumbers.map((number) => (
          <button
            className="py-3 px-5 mr-5 bg-slate-200 rounded-full hover:bg-slate-500 hover:text-gray-50 transition"
            key={number}
            onClick={() => {
              {
                setCurrentPage(number);
                scrollToTop();
              }
            }}
          >
            {number}
          </button>
        ))}
      </div>

      <div className="sm:mt-32 w-full py-8">
        <NewsLetterBox />
      </div>
    </div>
  );
};

export default Blog;
