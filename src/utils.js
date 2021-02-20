import getWords from './getWords';
const filterBySubstring = (value) => {
  console.log('substring', value);

  return value;
};

const filterByLength = (value) => {
  console.log('length', value);
  return value;
};

export { filterBySubstring, filterByLength };
