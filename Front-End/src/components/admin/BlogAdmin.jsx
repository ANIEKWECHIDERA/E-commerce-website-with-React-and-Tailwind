import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogAdmin = () => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    media: null,
    mediaPreview: null,
  });

  useEffect(() => {
    if (currentPost !== null) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPost]);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setNewPost({
      ...newPost,
      media: file,
      mediaPreview: URL.createObjectURL(file),
    });
  };

  const handleAddPost = () => {
    if (newPost.title && newPost.content) {
      setPosts([...posts, newPost]);
      toast.success('Post successfully added!');
      setNewPost({ title: '', content: '', media: null, mediaPreview: null });
    }
  };

  const handleEditPost = index => {
    setCurrentPost(index);
    setNewPost(posts[index]);
  };

  const handleUpdatePost = () => {
    const updatedPosts = [...posts];
    updatedPosts[currentPost] = newPost;
    setPosts(updatedPosts);
    toast.success('Post successfully updated!');
    setCurrentPost(null);
    setNewPost({ title: '', content: '', media: null, mediaPreview: null });
  };

  const handleDeletePost = index => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter((_, i) => i !== index));
      toast.info('Post successfully deleted!');
    }
  };

  const isFormValid =
    newPost.title.trim() !== '' && newPost.content.trim() !== '';

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Manage Blog Posts</h2>

      {/* Blog Post Form */}
      <div className="bg-white  rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">
          {currentPost !== null ? 'Edit Post' : 'Add New Post'}
        </h3>
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <textarea
          name="content"
          value={newPost.content}
          onChange={handleInputChange}
          placeholder="Content"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          rows="6"
        />
        <input type="file" onChange={handleFileChange} className="mb-4" />
        {newPost.mediaPreview && (
          <div className="mb-4">
            <img
              src={newPost.mediaPreview}
              alt="Media Preview"
              className="max-w-40 h-auto rounded-lg shadow-md"
            />
          </div>
        )}
        <button
          onClick={currentPost !== null ? handleUpdatePost : handleAddPost}
          disabled={!isFormValid}
          className={`px-4 py-2 rounded transition ${
            currentPost !== null
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-green-500 text-white hover:bg-green-600'
          } ${
            !isFormValid ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''
          }`}
        >
          {currentPost !== null ? 'Update Post' : 'Add Post'}
        </button>
      </div>

      {/* Blog Post List */}
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Existing Blog Posts</h3>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="mb-4 border-b border-gray-200 pb-4">
              <h4 className="text-lg font-semibold mb-2">{post.title}</h4>
              <div
                className="text-gray-700 mb-2"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              {post.media && (
                <img
                  src={URL.createObjectURL(post.media)}
                  alt="Post Media"
                  className="max-w-72 h-auto rounded-lg shadow-md mb-4"
                />
              )}
              <button
                onClick={() => handleEditPost(index)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeletePost(index)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No blog posts available.</p>
        )}
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
};

export default BlogAdmin;
