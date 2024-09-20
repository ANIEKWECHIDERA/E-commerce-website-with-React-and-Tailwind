import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const BlogAdminModal = ({
  isOpen,
  onClose,
  onUpdate,
  postData,
  onInputChange,
  onFileChange,
  tagsList,
  onTagChange,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className=" bg-white rounded-lg p-6 w-1/2 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl mb-4">Edit Post</h3>
        <input
          type="text"
          name="title"
          value={postData.title}
          onChange={onInputChange}
          placeholder="Title"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />
        <CKEditor
          editor={ClassicEditor}
          data={postData.content}
          config={{
            toolbar: [
              'heading',
              '|',
              'bold',
              'italic',
              '|',
              'link',
              'bulletedList',
              'numberedList',
              'undo',
              'redo',
            ],
            removePlugins: ['EasyImage', 'ImageUpload', 'BlockQuote', 'Table'], // Remove plugins as needed
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            onInputChange({ target: { name: 'content', value: data } });
          }}
        />
        <input type="file" onChange={onFileChange} className="mb-4" />
        {postData.mediaPreview && (
          <div className="mb-4">
            <img
              src={postData.mediaPreview}
              alt="Media Preview"
              className="max-w-40 h-auto rounded-lg shadow-md"
            />
          </div>
        )}
        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2">Select Tags:</h4>
          {tagsList.map(tag => (
            <label key={tag} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value={tag}
                checked={postData.tags.includes(tag)}
                onChange={onTagChange}
                className="mr-2"
              />
              {tag}
            </label>
          ))}
        </div>
        <div className="flex justify-between">
          <button onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={onUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogAdminModal;
