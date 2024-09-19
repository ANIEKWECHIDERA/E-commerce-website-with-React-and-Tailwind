import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const BlogAdmin = () => {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [editorData, setEditorData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    if (currentPost !== null) {
      const postToEdit = posts[currentPost];
      setNewPost({
        title: postToEdit.title,
        content: postToEdit.content,
        media: postToEdit.media,
        mediaPreview: postToEdit.mediaPreview,
        tags: postToEdit.tags,
      });
      setEditorData(postToEdit.content); // Update local editor state
    } else {
      setNewPost({
        title: '',
        content: '',
        media: null,
        mediaPreview: null,
        tags: [],
      });
      setEditorData('');
    }
  }, [currentPost, posts]);

  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    media: null,
    mediaPreview: null,
    tags: [],
  });

  const tagsList = [
    'Suit Styles & Trends',
    'Shirts & Ties',
    'Blazers & Jackets',
    'Shoes & Accessories',
    'Grooming & Maintenance',
    'Corporate Fashion Tips',
  ];

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (currentPost !== null) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPost]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      const sortedPosts = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setIsLoading(false);
      setPosts(sortedPosts);
    } catch (error) {
      toast.error('Error fetching posts.');
    }
  };

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
    setIsPreviewVisible(true);
  };

  const handleAddPost = async () => {
    if (newPost.title && newPost.content) {
      const formData = new FormData();
      formData.append('title', newPost.title);
      formData.append('content', newPost.content);
      formData.append('media', newPost.media);
      newPost.tags.forEach(tag => {
        formData.append('tags', tag);
      });
      setIsLoading(true);

      try {
        await axios.post('http://localhost:5000/api/blog', formData);
        toast.success('Post successfully added!');
        setNewPost({
          title: '',
          content: '',
          media: null,
          mediaPreview: null,
          tags: [],
        });

        fetchPosts();
        setIsLoading(false);
      } catch (error) {
        toast.error('Error adding post.');
      }
    }
  };

  const handleEditPost = index => {
    setCurrentPost(index);
    const postToEdit = posts[index];
    setNewPost({
      title: postToEdit.title,
      content: postToEdit.content,
      media: postToEdit.media || null, // Retain current media
      mediaPreview: postToEdit.mediaPreview || null, // Retain current media preview
      tags: postToEdit.tags,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional: scroll to the form
  };

  const handleUpdatePost = async () => {
    const formData = new FormData();
    formData.append('title', newPost.title);
    formData.append('content', newPost.content);
    if (newPost.media) {
      formData.append('media', newPost.media);
    }
    newPost.tags.forEach(tag => {
      formData.append('tags', tag);
    });
    setIsLoading(true);

    try {
      await axios.put(
        `http://localhost:5000/api/blog/${posts[currentPost]._id}`,
        formData
      );
      setIsLoading(false);
      toast.success('Post successfully updated!');
      fetchPosts();
      setCurrentPost(null);
    } catch (error) {
      toast.error('Error updating post.');
    }
  };
  const handleDeletePost = async index => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(
          `http://localhost:5000/api/blog/${posts[index]._id}`
        );
        setPosts(posts.filter((_, i) => i !== index));
        toast.info('Post successfully deleted!');
        fetchPosts();
      } catch (error) {
        toast.error('Error deleting post.');
      }
    }
  };

  const handleTagChange = e => {
    const { value, checked } = e.target;
    setNewPost(prevState => {
      const newTags = checked
        ? [...prevState.tags, value] // Add tag if checked
        : prevState.tags.filter(tag => tag !== value); // Remove if unchecked

      return { ...prevState, tags: newTags };
    });
  };

  const isFormValid =
    newPost.title.trim() !== '' && newPost.content.trim() !== '';

  return (
    <div>
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="flex flex-col items-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4"></div>
            <p className="text-white">Uploading...</p>
          </div>
        </div>
      )}
      <h2 className="text-2xl font-normal mb-6">Manage Blog Posts</h2>

      {/* Blog Post Form */}
      <div className="bg-white rounded-lg p-6 mb-6">
        <h3 className="text-xl font-normal mb-4">
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
        <CKEditor
          editor={ClassicEditor}
          data={editorData}
          onChange={(event, editor) => {
            const data = editor.getData();
            setNewPost({ ...newPost, content: data });
          }}
        />
        <input type="file" onChange={handleFileChange} className="mb-4" />
        {isPreviewVisible && (
          <div className="mb-4 relative">
            <img
              src={newPost.mediaPreview}
              alt="Media Preview"
              className="max-w-40 h-auto rounded-lg shadow-md"
            />
            <button
              onClick={() => {
                setIsPreviewVisible(false);
                setNewPost({ ...newPost, media: null, mediaPreview: null });
              }}
              className="absolute top-0 left-0 text-red-300 text-xl p-1 bg-slate-800 rounded-full"
            >
              <i class="bi bi-x-circle"></i>
            </button>
          </div>
        )}

        {/* Tags Selection */}
        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2">Select Tags:</h4>
          {tagsList.map(tag => (
            <label key={tag} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value={tag}
                checked={newPost.tags.includes(tag)}
                onChange={handleTagChange}
                className="mr-2"
              />
              {tag}
            </label>
          ))}
        </div>

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
        <h3 className="text-xl font-normal border-b mb-4">
          Existing Blog Posts
        </h3>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={post._id} className="mb-4 border-b border-gray-200 pb-4">
              <h4 className="text-lg font-semibold mb-2">{post.title}</h4>
              <div
                className="text-gray-700 mb-2"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              {post.image && (
                <img
                  src={post.image}
                  alt="Post Media"
                  className="max-w-72 h-auto rounded-lg shadow-md mb-4"
                />
              )}
              <div className="mb-2">
                <strong>Tags:</strong> {post.tags.join(', ')}
              </div>
              <div className="mb-2">
                <strong>Posted on:</strong>{' '}
                {format(new Date(post.createdAt), 'MMMM d, yyyy HH:mm')}
              </div>
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
