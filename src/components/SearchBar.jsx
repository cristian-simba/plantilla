import React from "react";
import { SearchIcon } from "lucide-react";

const SearchBar = ({onSearch }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form className="max-w-md mb-8" onSubmit={handleSubmit}>
            <label htmlFor="default-search" className="flex-none mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Search
            </label>
            <div className="flex items-center flex-grow border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <SearchIcon size={18} className="text-gray-500" />
                </div>
                <input
                    type="search"
                    onChange={onSearch}
                    id="default-search"
                    className="flex-grow p-2 pl-2 text-sm text-gray-900 border-none bg-transparent focus:outline-none dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Realiza una búsqueda"
                />
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-50 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Buscar
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
