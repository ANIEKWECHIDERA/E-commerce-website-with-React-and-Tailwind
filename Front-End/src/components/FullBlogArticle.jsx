import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const FullBlogArticle = () => {
  const { id } = useParams(); // Get the blog post ID from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://e-commerce-website-with-react-and.onrender.com/api/blog/${id}`
        );
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto mt-40 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-60 object-cover rounded-lg mb-4"
        />
      )}
      <div
        className="mt-4 text-gray-700"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      <div className="mt-6 font-bold text-lg">
        <p>Tags: {blog.tags.join(', ')}</p>
      </div>
      <div className="mt-8">
        <hr className="my-4 border-gray-300" />
        <p className="text-gray-600 italic">
          Published on: {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default FullBlogArticle;
