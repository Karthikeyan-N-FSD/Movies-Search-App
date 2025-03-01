import axios from 'axios';

const API_KEY = 'd9dd4140';
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query, page = 1, type = '') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        page,
        ...(type && { type }),
      },
    });
    const data = response.data;
    if (data.Response === 'False') {
      throw new Error(data.Error);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: imdbID,
        plot: 'full',
      },
    });
    const data = response.data;
    if (data.Response === 'False') {
      throw new Error(data.Error);
    }
    return data;
  } catch (error) {
    throw error;
  }
};
