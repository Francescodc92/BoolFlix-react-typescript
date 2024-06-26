import { Movie, Series } from "../types";

export const formatSrcImage = (element: Movie | Series) => {
    const imageSrc =
      "https://image.tmdb.org/t/p/" + "w300" + element.poster_path;

    return imageSrc;
};