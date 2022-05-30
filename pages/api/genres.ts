
import { NextApiRequest, NextApiResponse } from 'next';

const tmdbApiKey = process.env.TMDB_API_KEY;

const genres = async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbApiKey}`);
    if (!response.ok) {
      const message = `An error occurred: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    res.status(200).json(data);
}

export default genres;
