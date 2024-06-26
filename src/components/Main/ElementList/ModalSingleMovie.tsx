import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { ModalContext } from "../../../context/ModalContext";
import { MovieContext } from "../../../context/MovieContext";
import { apiRequest } from "../../../services/axiosInstance";
import { Actors } from "../../../types";
import { formatSrcImage } from "../../../utilities/formatPathImage";
import { formatVote } from "../../../utilities/formatVoteValue";
import { changeClassByLanguage } from "../../../utilities/languageForIcon";
import "./ModalSingleMovie.css";
export const ModalSingleMovie = () => {
  const { categoriesMovieList, categoriesSeriesList } =
    useContext(MovieContext);
  const { setData, data, setIsModalOpen } = useContext(ModalContext);
  const [actors, setActors] = useState<Actors[]>([]);

  const splitOverview = () => {
    const overview = data?.overview;
    const formattedOverview = overview?.substr(0, 150) + "...";
    return formattedOverview;
  };

  const getGenres = () => {
    const genres: string[] = [];
    if (isMovie()) {
      categoriesMovieList?.forEach((element) => {
        if (data?.genre_ids.includes(element.id)) {
          genres.push(element.name);
        }
      });
    } else {
      categoriesSeriesList?.forEach((element) => {
        if (data?.genre_ids.includes(element.id)) {
          genres.push(element.name);
        }
      });
    }
    return genres;
  };

  const isMovie = () => {
    if (!data) return;
    return "title" in data;
  };

  useEffect(() => {
    apiRequest
      .get(`https://api.themoviedb.org/3/movie/${data?.id}/credits`)
      .then((res: AxiosResponse) => {
        setActors(res.data.cast);
      });
  }, [data]);

  const closeModal = () => {
    setIsModalOpen(false);
    setData(null);
  };

  return (
    <>
      {data && (
        <div className="card-more-info">
          <div className="content">
            {data.poster_path ? (
              <img
                src={formatSrcImage(data)}
                alt="movieObj.title || movieObj.name"
              />
            ) : (
              <div className="no-img">nessuna immagine</div>
            )}
            <div className=" info-movie">
              <ul>
                <li>
                  <p className="title">
                    {"title" in data ? data?.title : data?.name}
                  </p>
                </li>
                <li>
                  <h3>titolo originale:</h3>
                  {"original_title" in data
                    ? data?.original_title
                    : data?.original_name}
                </li>
                <li>
                  <h3>Lingua originale:</h3>
                  <span
                    className={changeClassByLanguage(data) + " icon"}
                  ></span>
                </li>
                <li>
                  <h3>Valutazione:</h3>
                  <div>
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        icon={faStar}
                        key={i}
                        className={i < formatVote(data) ? "active-star" : ""}
                      />
                    ))}
                  </div>
                </li>
                <li>
                  <h3>Descrizione:</h3>
                  {splitOverview()}
                </li>
                <li className="genre">
                  <h3>Genere:</h3>

                  {getGenres().map((genre) => (
                    <p>- {genre}</p>
                  ))}
                </li>
                <li>
                  <h3>Cast:</h3>
                  <ul className="actors">
                    {actors.map((actor) => (
                      <li key={actor.id}>- {actor.name}</li>
                    ))}
                  </ul>
                </li>
              </ul>
            </div>
            <button className=" close-button" onClick={closeModal}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
