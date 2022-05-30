import { rest } from 'msw';
import trending from './mock-trending.json'
import genres from './mock-genres.json'

export const handlers = [
  rest.get(`https://api.themoviedb.org/3/trending/all/day`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(trending)
    )
  }),
  rest.get(`https://api.themoviedb.org/3/genre/movie/list`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(genres)
    )
  }),
];