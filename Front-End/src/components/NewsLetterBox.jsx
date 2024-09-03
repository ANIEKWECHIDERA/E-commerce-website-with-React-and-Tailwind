import React from 'react';

const NewsLetterBox = () => {
  const onSubmitHandler = event => {
    event.preventDefault();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center text-center">
      <div className="w-full  text-left md:pr-10 mb-10">
        <p className="text-2xl font-medium text-gray-700 ">
          Subscribe Now and Get 23% off!
        </p>
        <p className=" text-gray-400 mt-3">
          {' '}
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus
          explicabo qui illo incidunt? Dignissimos quisquam accusantium ab.
          Aliquam id excepturi illo, iusto, ad vitae eveniet laborum molestias,
          alias error neque.
        </p>
      </div>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 h-10 my-6 border md:pl-10"
      >
        <input
          className="w-full sm:flex1 outline-none"
          type="email"
          placeholder="Enter Email Address"
          required
        />
        <button
          className="rounded bg-black text-white text-xs px-10 py-4"
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
