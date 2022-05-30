import Movie from "./Movie";
import Series from "./Series";

type QueryResult = {
  results?: (Movie | Series)[];
  page?: number;
  total_pages?: number;
  total_result?: number;
}

export default QueryResult;