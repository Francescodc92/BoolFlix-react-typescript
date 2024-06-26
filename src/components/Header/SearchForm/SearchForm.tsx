import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useRef, useState } from "react";
import { MovieContext } from "../../../context/MovieContext";
import { apiRequest } from "../../../services/axiosInstance";
import "./SearchForm.css";

export const SearchForm = () => {
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const { setMovie, setSeries, setIsLoading } = useContext(MovieContext);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    apiRequest
      .get(`search/movie`, {
        params: {
          query: formatInputUser(search),
        },
      })
      .then((res) => {
        setMovie(res.data.results);
      })
      .finally(() => setIsLoading(false));

    //get series
    apiRequest
      .get(`search/tv`, {
        params: {
          query: formatInputUser(search),
        },
      })
      .then((res) => {
        setSeries(res.data.results);
      })
      .finally(() => setIsLoading(false));
  };

  const formatInputUser = (userInput: string) => {
    const formattedInput = userInput.replace(/\s/g, "+");
    return formattedInput;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </label>
      <input
        className={
          search.length > 0 || isFocused
            ? "requestUserInput on-use"
            : "requestUserInput"
        }
        ref={searchInputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        id="search"
        name="search"
        placeholder="Cerca..."
      />

      <button type="submit" className="search-btn">
        Cerca
      </button>
    </form>
  );
};
