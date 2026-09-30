 let count = 0;

function increment() {
  count++;
  return count;
}

function getCount() {
  return count;
}

module.exports = {
  increment,
  getCount,
};
 