import {fetchMovies, fetchPoster} from '../provider';

export const getMoviesAction = (moviesData, value) => dispatch => {
  dispatch({
    type: 'SET_POSTER'
  });
  fetchPoster(value)
    .then(response => {
      const poster = response.Poster;
      const img = (poster && poster !== 'N/A') ? poster : 'noImg.jpg';
      dispatch({
        type: 'SET_POSTER',
        img
      });
    })
    .catch(err => {
      console.error('Error during fetching the poster', err);
      dispatch({
        type: 'SET_POSTER',
        img: 'noImg.jpg'
      });
    });
  dispatch({
    type: 'SELECT_MOVIE',
    moviesData,
    value
  });
};

export const changeAction = value => {
  return {
    type: 'CHANGE',
    value
  };
};

export const initAction = () => dispatch => {
  fetchMovies.then(data => {
    const moviesData = data.data;
    dispatch({
      type: 'INIT',
      moviesData
    });
  })
  .catch(err => {
    console.error('Error during fetching data from movies', err);
    dispatch({
      type: 'INIT_FAILED'
    });
  });
};
