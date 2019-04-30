import { debounce } from '../';

jest.useFakeTimers();

describe('debounce', () => {
  let func;
  let debouncedFunc;

  beforeEach(() => {
    func = jest.fn();
    debouncedFunc = debounce(func, 1000);
  });

  it('execute just once', () => {
    for (let i = 0; i < 100; i++) {
      debouncedFunc();
    }

    // fast-forward time
    jest.runAllTimers();

    expect(func).toBeCalledTimes(1);
  });
});
