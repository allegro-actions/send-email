const action = require('./action');

describe('action', () => {

  test('to throw error', () => {
    // expect
    expect(() => action().toEqual('ok'));
  });

});
