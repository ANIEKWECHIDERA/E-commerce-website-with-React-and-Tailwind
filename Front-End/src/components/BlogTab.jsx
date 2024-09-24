import React from 'react';

const BlogTab = ({ img, title, description, readMore }) => {
  return (
    <div className=" mb-12 h-full shadow-md py-8 px-4 md:hover:shadow-sm ">
      <div className="p-3 flex flex-col items-center sm:flex-row justify-between md:flex-col ">
        <div className="overflow-hidden h-[480px]">
          <img
            className="hover:scale-110 h-full transition ease-in-out w-[240px] lg:w-80 object-cover"
            src={img}
            alt="post image"
          />
        </div>
        <div>
          <h3 className="my-4 text-center text-2xl text-gray-900 font-medium">
            {title}
          </h3>
          <p
            className="w-full mx-auto sm:w-[300px] text-justify text-gray-600"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>{' '}
          <a
            href={readMore}
            className="text-blue-500 hover:underline block mt-10"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogTab;
