import axios from 'axios';

const API_KEY = '36881053-d0d1537e2fca48fbbc934d91b';

export function pingURL({ query, page }) {
  const url = `https://pixabay.com/api/`;

  return axios.get(url, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 40,
    },
  });
}
