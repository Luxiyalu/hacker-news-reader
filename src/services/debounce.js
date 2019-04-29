export default (fn, time = 10) => {
  // debault time to minimal interval to ensure smooth UX when scrolling
  let timeout;

  return function() {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};
