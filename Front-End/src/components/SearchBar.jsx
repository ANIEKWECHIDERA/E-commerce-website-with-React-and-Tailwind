import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisisble] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisisble(true);
    } else {
      setVisisble(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center sm:mt-40">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search..."
        />
        <img className="w-4" src={assets.search_icon} alt="search icon" />
      </div>
      <img
        className="inline w-3 cursor-pointer"
        onClick={() => setShowSearch(false)}
        src={assets.cross_icon}
        alt="Close icon"
      />
    </div>
  ) : null;
};

export default SearchBar;
