const API_KEY = '36881053-d0d1537e2fca48fbbc934d91b';
let q = 'yellow+flowers';
let image_type = 'photo';
let orientation = 'horizonatal';
let safesearch = 'true';
const API_PATH = `https://pixabay.com/api/?key=${API_KEY}+&q=${q}+image_type=${image_type}+orientation=${orientation}+safesearch=${safesearch}`;

export function pingURL({
  url = API_PATH,
  method = 'get',
  body,
  headers = { 'Content-Type': 'application/json' },
}) {
  return new Promise((resolve, reject) => {
    fetch(url, { method, body, headers });
  }).then(response => {
    if (!response.ok) {
      reject(`Error code ${response.status}`);
    }
    if (response.status === 204) resolve({});
    return response
      .json()
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err.toString());
      });
  });
}
const picturesAPI = { get: () => pingURL({ url: `${API_PATH}/pictures` }) };
