import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search?query=" + searchInput);
    setSearchInput("");
  };

  return (
    <form
      className="relative ml-10 mr-auto flex h-10 w-96 items-center overflow-hidden rounded-lg bg-white focus-within:shadow-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid h-full w-12 place-items-center text-gray-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        className="peer h-full w-full pr-2 text-sm text-gray-700 outline-none"
        type="text"
        id="search"
        placeholder="Busca una receta"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </form>
  );
};

export default SearchForm;
