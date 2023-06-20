import { Router } from 'express'
import { CreateMovieRequest, GetMovieFromIMDBRequest, SearchRequest } from './movies.interfaces'
import * as movieService from './movies.servies'
import * as IMDBService from './imdb.service'

const router = Router()

router.get('/search', async ({ query: { searchTerm } }: SearchRequest, res) => {
  try {
    const results = await movieService.movieSearch(searchTerm)
    res.status(200).send(results);
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get('/imdb-search', async ({ query: { searchTerm } }: SearchRequest, res) => {
  try {
    const results = await IMDBService.searchInIMDB(searchTerm)
    res.status(200).send(results);
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get('/imdb/:IMDBId', async ({ params: { IMDBId } }: GetMovieFromIMDBRequest, res) => {
  try {
    const result = await IMDBService.getMovieFromIMDB(IMDBId)
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post('/', async ({ body }: CreateMovieRequest, res) => {
  try {
    const result = await movieService.create(body)
    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get('/', async (_, res) => {
  try {
    const results = await movieService.findAll();
    res.status(200).send(results);
  } catch (err) {
    res.status(400).send(err)
  }
})

export default router;
