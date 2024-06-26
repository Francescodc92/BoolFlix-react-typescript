import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { ModalContext } from "../../../context/ModalContext";
import { Movie, Series } from "../../../types";
import { formatSrcImage } from "../../../utilities/formatPathImage";
import { formatVote } from "../../../utilities/formatVoteValue";
import { changeClassByLanguage } from "../../../utilities/languageForIcon";
import "./CardElement.css";
type ElementProps = {
  element: Movie | Series;
};
export const CardElement = ({ element }: ElementProps) => {
  const { setIsModalOpen, setData } = useContext(ModalContext);

  const handleClick = () => {
    setData(element);
    setIsModalOpen(true);
  };

  return (
    <div className="card">
      {element.poster_path ? (
        <img
          src={formatSrcImage(element)}
          alt={"title" in element ? element.title : element.name}
        />
      ) : (
        <div className="no-img">nessuna immagine</div>
      )}
      <div className="info">
        <ul>
          <li>
            <p className="title">
              {"title" in element ? element.title : element.name}
            </p>
          </li>
          <li>
            <h3>Lingua originale:</h3>
            <span className={changeClassByLanguage(element) + " icon"}></span>
          </li>
          <li>
            <h3>Valutazione:</h3>
            <div>
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  icon={faStar}
                  key={i}
                  className={i < formatVote(element) ? "active-star" : ""}
                />
              ))}
            </div>
          </li>
        </ul>
        <div className="button-wrapper">
          <button className="info-button" onClick={handleClick}>
            more info
          </button>
        </div>
      </div>
    </div>
  );
};
