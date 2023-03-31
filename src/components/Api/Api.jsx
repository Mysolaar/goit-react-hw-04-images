const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '33163838-5e8435841f895ee24b4a3058a';

async function fetchQuery(searchQuery, page) {
  const response = await fetch(
    `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}
      &image_type=photo&orientation=horizontal&page=
      ${page}&per_page=12`
  );
  return await response.json();
}

const api = { fetchQuery };

export default api;