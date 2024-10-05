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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://e-commerce-website-with-react-and.onrender.com/api/blogs"
        );
        const sortedBlogs = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setBlogs(sortedBlogs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

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
        <h1 className="prata-regular text-xl sm:text-4xl text-center text-gray-700 font-medium">
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
                {isLoading ? (
                  <li>Loading Articles...</li>
                ) : (
                  recentPosts.map((post) => (
                    <li key={post._id} className=" mb-3 ">
                      <Link
                        to={`/blog/${post._id}`}
                        className="md:hover:underline
                     text-gray-500 hover:text-gray-700 cursor-pointer"
                      >
                        {post.title}
                      </Link>
                    </li>
                  ))
                )}
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

        <div
          className={`md:w-2/3 md:grid md:grid-cols-1 md:gap-6 md:gap-y-4 ${
            isLoading ? "lg:grid-cols-1" : "lg:grid-cols-2"
          } `}
        >
          {isLoading && (
            <div className="h-full mt-40" role="status">
              <svg
                aria-hidden="true"
                className="mx-auto my-auto  w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-black"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          )}
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
          ) : isLoading ? (
            ""
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
    </div>
  );
};

export default Blog;
