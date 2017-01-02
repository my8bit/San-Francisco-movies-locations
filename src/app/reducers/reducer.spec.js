import {dataReducer} from './reducer.js';

const moviesData = [
  [1, 2, 3, 4, 5, 6, 7, 8, 'some'], [1, 2, 3], [1, 2, 3, 4, 5, 6, 7, 8, 'some']
];

describe('reducer test suite', () => {
  describe('SELECT_MOVIE', () => {
    const action = {type: 'SELECT_MOVIE', moviesData};
    const state = {};
    const result = [[1, 2, 3, 4, 5, 6, 7, 8, 'some'],
      [1, 2, 3, 4, 5, 6, 7, 8, 'some']];
    it('should return only movies with the specified name', () => {
      expect(dataReducer(state, Object.assign({}, action, {value: 'some'})).movies)
        .toEqual(result);
    });
    it('should return only movies with the specified uppercase name', () => {
      expect(dataReducer(state, Object.assign({}, action, {value: 'SOME'})).movies)
        .toEqual(result);
    });
    it('should return only movies with the specified name with spaces', () => {
      expect(dataReducer(state, Object.assign({}, action, {value: ' some '})).movies)
        .toEqual(result);
    });
    it('should return empty array because there are no movie name in moview row', () => {
      const moviesData = [[1], [2], [3]];
      expect(dataReducer(state, Object.assign({}, action, {moviesData, value: 'some'})).movies)
        .toEqual([]);
    });
    it('should return empty array because movie name is not a string', () => {
      const moviesData = [[1], [2], [3]];
      expect(dataReducer(state, Object.assign({}, action, {moviesData, value: 1}, action)).movies)
        .toEqual([]);
    });
  });
});
