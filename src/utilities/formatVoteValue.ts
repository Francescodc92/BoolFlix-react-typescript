import { Movie, Series } from "../types";

export const formatVote = (element:Movie | Series) => {
    return Math.ceil(element.vote_average / 2);
};