import {changeAction} from './action.js';

describe('actions test suite', () => {
  describe('changeAction', () => {
    it('should return change action', () => {
      expect(changeAction('action'))
        .toEqual({
          type: 'CHANGE',
          value: 'action'
        });
    });
  });
});
