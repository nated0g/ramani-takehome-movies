import Movie from "../schema/Movie";
import Series from "../schema/Series";

export function isMovie(item: Movie | Series): item is Movie {
  return (item as Movie).title !== undefined;
}
