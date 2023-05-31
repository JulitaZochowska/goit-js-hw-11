import { pingURL } from './fetch.js';
import Notiflix from 'notiflix';

let loadMoreButton;
let gallery;
let searchForm;

window.addEventListener('load', function () {
  loadMoreButton = document.querySelector('.load-more');
  gallery = document.querySelector('.gallery');
  searchForm = document.querySelector('#search-form');
});

let currentPage;
let searchQuery;

function clearGallery() {
  const photoCards = document.querySelectorAll('.photo-card');

  for (let i = 0; i < photoCards.length; i++) {
    const photoCard = photoCards[i];
    photoCard.remove();
  }
}

function createPhotoCard(hit) {
  return `<div class="photo-card"><figure><img class="pictures" src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" /><div class="info"><figcaption><p class="info-item"><b>Likes</b><br />${hit.likes}</p><p class="info-item"><b>Views</b><br />${hit.views}</p><p class="info-item"><b>Comments</b><br />${hit.comments}</p><p class="info-item"><b>Downloads</b><br />${hit.downloads}</p></figcaption></div></figure></div>`;
}

function loadPictures(hits) {
  const gallery = document.querySelector('.gallery');
  hits.forEach(hit => {
    const card = createPhotoCard(hit);
    gallery.innerHTML += card;
  });
}

function showLoadMoreButton() {
  loadMoreButton.classList.add('visible');
}

function hideLoadMoreButton() {
  loadMoreButton.classList.remove('visible');
  Notiflix.Notify.info(
    'We are sorry, but you have reached the end of search results.'
  );
}

export async function onSubmit(event) {
  event.preventDefault();
  //pobiera wartość wprowadzoną przez uytkownika do pola tekstowego formularza wyszukiwania
  searchQuery = searchForm.searchQuery.value;
  //trim() usuwa białe znaki (spacje, tabularory)
  //jeśli searchQuery jest puste, czyli uytkownik nic nie wpisał w inputa, robimy return przerywając
  //dalsze wykonywanie kodu (aby uniknąć wysyłania pustych ządań do API)
  if (searchQuery.trim() === '') {
    return;
  }

  clearGallery();
  const result = await pingURL({
    query: searchQuery,
    page: 1,
  });
  currentPage = 1;
  if (result.data.totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  loadPictures(result.data.hits);
  if (result.data.totalHits > currentPage * 40) {
    showLoadMoreButton();
  }
}

export async function onLoadMore() {
  currentPage++;
  const result = await pingURL({
    query: searchQuery,
    page: currentPage,
  });
  loadPictures(result.data.hits);
  if (result.data.totalHits <= currentPage * 40) {
    hideLoadMoreButton();
  }
}
