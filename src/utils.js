const filterBySubstring = (inputValue, data, checked) => {
  console.log(checked);
  return checked
    ? data.filter((el) => el.includes(inputValue.trim())).join(', ')
    : data
        .filter((el) =>
          el.toLowerCase().includes(inputValue.trim().toLowerCase())
        )
        .join(', ');
};

const filterByLength = (inputValue, data) =>
  data.filter((el) => el.length > inputValue).join(', ');

export { filterBySubstring, filterByLength };
