import axios from 'axios'
import * as cheerio from 'cheerio';
import { BASE_SEARCH_URL, RUTOR_URL } from './movies.const';
import { extractMagnetFromQuery } from './movies.utils';

export const movieSearch = async (searchTerm: string) => {
    const searchResult = await axios.get(`${BASE_SEARCH_URL}/${searchTerm}`)
    const $ = cheerio.load(searchResult.data);

    const data = $('#index tr').toArray();

    return data.map(item => {
        const [_, magnetTag, title] = $(item).find('a').toArray();

        const torrentUrl = `${RUTOR_URL}${$(title).attr('href')}`
        const magnetLink = $(magnetTag).attr('href');        

        return ({
            magnet: extractMagnetFromQuery(magnetLink),
            title: $(title).text(),
            torrentUrl,
        })
    }).filter(item => item.title)

}
