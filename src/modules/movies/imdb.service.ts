import { stringify } from 'qs'
import axios from 'axios'
import { IMDB_SEARCH_URL } from './movies.const'

export const searchInIMDB = async (query) => {
  const queryParams = stringify({
    language: 'ru',
    api_key: '8d9b44db0c2dfcce1e041eeb333d135c',
    query
  })
  const {data : {results}} = await axios.get(`${IMDB_SEARCH_URL}/search/movie?${queryParams}`)

  const [movie] = results
  return movie;
}

export const getMovieFromIMDB = async (IMDBId: string) => {
  const queryParams = stringify({
    language: 'ru',
    api_key: '8d9b44db0c2dfcce1e041eeb333d135c',
  })
  const result = await axios.get(`${IMDB_SEARCH_URL}/movie/${IMDBId}?${queryParams}`)

  return result.data;
}