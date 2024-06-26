import { AxiosResponse } from "axios";
import { useContext, useEffect } from "react";
import { ModalContext } from "../../context/ModalContext";
import { MovieContext } from "../../context/MovieContext";
import { apiRequest } from "../../services/axiosInstance";
import { ElementList } from "./ElementList/ElementList";
import { ModalSingleMovie } from "./ElementList/ModalSingleMovie";
import { Loader } from "./Loader/Loader";
import "./Main.css";

export const Main = () => {
  const { movie, setMovie, series, setSeries, isLoading, setIsLoading } =
    useContext(MovieContext);

  const { isModalOpen } = useContext(ModalContext);

  useEffect(() => {
    setIsLoading(true);

    apiRequest("movie/now_playing")
      .then((res: AxiosResponse) => {
        setMovie(res.data.results);
      })
      .finally(() => setIsLoading(false));

    apiRequest("tv/on_the_air")
      .then((res: AxiosResponse) => {
        setSeries(res.data.results);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <main>
      {isLoading && <Loader />}
      {movie !== null && series !== null ? (
        <div className="container">
          <h2>movies</h2>
          <ElementList elements={movie} />

          <h2>series</h2>
          <ElementList elements={series} />
        </div>
      ) : (
        <p>Nessun elemento da mostrare </p>
      )}

      {isModalOpen && <ModalSingleMovie />}
    </main>
  );
};
