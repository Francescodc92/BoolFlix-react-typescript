import { ReactNode, createContext, useState } from "react";
import { Genre, Movie, Series } from "../types";

interface MovieContextType {
  movie: Movie[] | null;
  setMovie: React.Dispatch<React.SetStateAction<Movie[] | null>>;
  series: Series[] | null;
  setSeries: React.Dispatch<React.SetStateAction<Series[] | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  categoriesMovieList: Genre[] | null;
  setCategoriesMovieList: React.Dispatch<React.SetStateAction<Genre[] | null>>;
  categoriesSeriesList: Genre[] | null;
  setCategoriesSeriesList: React.Dispatch<React.SetStateAction<Genre[] | null>>;
}

export const MovieContext = createContext<MovieContextType>({
  movie: null,
  setMovie: () => {},
  series: null,
  setSeries: () => {},
  isLoading: false,
  setIsLoading: () => {},
  categoriesMovieList: null,
  setCategoriesMovieList: () => {},
  categoriesSeriesList: null,
  setCategoriesSeriesList: () => {},
});

interface MovieProviderProps {
  children: ReactNode;
}

export function MovieProvider({ children }: MovieProviderProps) {
  const [movie, setMovie] = useState<Movie[] | null>(null);
  const [series, setSeries] = useState<Series[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesMovieList, setCategoriesMovieList] = useState<
    Genre[] | null
  >(null);
  const [categoriesSeriesList, setCategoriesSeriesList] = useState<
    Genre[] | null
  >(null);

  const contextValue: MovieContextType = {
    movie,
    setMovie,
    series,
    setSeries,
    isLoading,
    setIsLoading,
    categoriesMovieList,
    setCategoriesMovieList,
    categoriesSeriesList,
    setCategoriesSeriesList,
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
}
