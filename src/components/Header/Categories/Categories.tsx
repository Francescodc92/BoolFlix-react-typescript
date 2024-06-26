import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../../context/MovieContext.tsx";
import { apiRequest } from "../../../services/axiosInstance.ts";
import { Genre, GenresResponse } from "../../../types";
import "./Categories.css";

export const Categories = () => {
  const {
    categoriesMovieList,
    setCategoriesMovieList,
    categoriesSeriesList,
    setCategoriesSeriesList,
  } = useContext(MovieContext);
  const [selectedCategory, setSelectedCategory] = useState<Genre>();
  const [isOpen, setIsOpen] = useState(false);
  const { setMovie, setSeries, setIsLoading } = useContext(MovieContext);

  useEffect(() => {
    setIsLoading(true);
    apiRequest
      .get("/discover/movie", {
        params: {
          with_genres: selectedCategory?.id,
        },
      })
      .then((res: AxiosResponse) => {
        setMovie(res.data.results);
      })
      .finally(() => setIsLoading(false));

    apiRequest
      .get("discover/tv", {
        params: {
          with_genres: selectedCategory?.id,
        },
      })
      .then((res: AxiosResponse) => {
        setSeries(res.data.results);
      })
      .finally(() => setIsLoading(false));
  }, [selectedCategory]);

  const getCategoriesList = () => {
    apiRequest
      .get<GenresResponse>("genre/movie/list")
      .then((res: AxiosResponse) => {
        setCategoriesMovieList(res.data.genres);
      });

    apiRequest
      .get<GenresResponse>("genre/tv/list")
      .then((res: AxiosResponse) => {
        setCategoriesSeriesList(res.data.genres);
      });
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  const handleClick = (category: Genre) => {
    setIsOpen((prev) => !prev);
    setSelectedCategory(category);
  };

  return (
    <div className="input-wrapper">
      <div className="category" onClick={() => setIsOpen(!isOpen)}>
        <p>{selectedCategory ? selectedCategory?.name : "Categorie"}</p>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
      {/* category select */}

      <div className={"categories-list" + (isOpen ? " open" : "")}>
        <div className="movie">
          <h4>Movie</h4>
          {categoriesMovieList && (
            <div className="genre">
              {categoriesMovieList.map((category: Genre) => (
                <button key={category.id} onClick={() => handleClick(category)}>
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* category movie list */}
        <div className="series">
          <h4>series</h4>
          {categoriesSeriesList && (
            <div className="genre">
              {categoriesSeriesList.map((category: Genre) => (
                <button onClick={() => handleClick(category)} key={category.id}>
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* category series list */}
      </div>
      {/* categories list popup */}
    </div>
  );
};
