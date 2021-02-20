const getWords = async () => {
  const url = 'https://www.mrsoft.by/data.json';

  try {
    const response = await fetch(url);

    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log('err', err);
  }
};
getWords();
export default getWords;
