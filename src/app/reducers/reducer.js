import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import _ from 'lodash';

const initialState = {
  label: 'Search movie by name...',
  inputDisabled: false,
  filterBy: 'Name',
  img: 'http://i.imgur.com/N8BOBH1.gif',
  value: '',
  years: [],
  currentYear: '',
  movieTitles: [],
  movies: [],
  moviesData: []
};

export const dataReducer = (state = initialState, action) => {
  const {moviesData, value, img = 'http://i.imgur.com/N8BOBH1.gif', filterBy} = action;
  switch (action.type) {
    case 'INIT':
      return Object.assign({}, state, {
        movieTitles: _.uniqWith(moviesData.map(movieColumn => movieColumn[8].trim()), _.isEqual),
        moviesData
      });
    case 'INIT_FAILED':
      return Object.assign({}, state, {
        label: 'Error during fetch data from server.'
      });
    case 'SELECT_MOVIE':
      return Object.assign({}, state, {
        value,
        movies: moviesData.filter(movieRow => {
          const movie = movieRow[8];
          const movieName = value;
          return (typeof movie === 'string' && typeof movieName === 'string') ?
            movie.trim().toLowerCase() === movieName.trim().toLowerCase() : false;
        })
      });
    case 'CHANGE':
      return Object.assign({}, state, {
        value
      });
    case 'FILTER_CHANGE':
      return Object.assign({}, state, {
        filterBy
      });
    case 'SET_POSTER':
      return Object.assign({}, state, {
        img
      });
    default:
      return Object.assign({}, state);
  }
};

const reducer = combineReducers({
  dataState: dataReducer
});

export const store = createStore(reducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);
