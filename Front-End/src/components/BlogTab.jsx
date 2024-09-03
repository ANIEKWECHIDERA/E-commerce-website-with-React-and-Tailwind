import React from 'react';

const BlogTab = ({ img, title, description }) => {
  return (
    <div>
      <div>
        <img src={img} alt="" />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div>
        <p>Read more...</p>
      </div>
    </div>
  );
};

export default BlogTab;
