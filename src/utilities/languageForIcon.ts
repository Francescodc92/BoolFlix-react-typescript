import { Movie, Series } from "../types";

export  const changeClassByLanguage = (element: Movie | Series) => {
    let language = element.original_language;
    if (language == "en") {
      language = "us";
    } else if (language == "ja") {
      language = "jp";
    }
    const iconClass = "fi " + "fi-" + language;

    return iconClass;
  };