const getWords = async () => {
  const url =
    'https://evening-basin-27448.herokuapp.com/https://www.mrsoft.by/data.json';

  try {
    const response = await fetch(url);

    const data = await response.json();
    return data?.data ?? null;
  } catch (err) {
    console.log('err', err);
  }
};

export default getWords;
