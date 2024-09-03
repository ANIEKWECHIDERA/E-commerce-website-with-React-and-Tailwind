import React from 'react';

const BlogTab = ({ img, title, description }) => {
  return (
    <div className=" mb-12 shadow-md p-8 md:hover:shadow-sm ">
      <div className="p-3 flex flex-col items-center sm:flex-row justify-between md:flex-col">
        <img className="w-[240px] object-cover" src={img} alt="" />

        <div>
          <h3 className="my-4 text-center text-2xl text-gray-900 font-medium">
            {title}
          </h3>
          <p className="w-full sm:w-[250px] text-justify text-gray-600">
            {description}
          </p>
        </div>
      </div>

      <div>
        <p>Read more...</p>
      </div>
    </div>
  );
};

export default BlogTab;
