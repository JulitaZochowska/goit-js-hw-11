import { pingURL } from './fetch.js';
//import * as dupsko from './fetch.js';
import { loadPictures } from './handlers.js';
let searchForm;
let gallery;
let loadMoreButton;

window.addEventListener('load', function () {
  searchForm = document.querySelector('#search-form');
  gallery = this.document.querySelector('.gallery');
  loadMoreButton = document.querySelector('.load-more');

  searchForm.addEventListener('submit');
  loadPictures();

  function clearGallery() {
    const photoCards = document.querySelectorAll('.photo-card');

    for (i = 0; i < photoCards.length; i++) {
      const photoCard = photoCards[i];
      photoCard.remove();
    }
  }

  searchForm.addEventListener('submit', event => {
    event.preventDefault();
    //pobiera wartość wprowadzoną przez uytkownika do pola tekstowego formularza wyszukiwania
    const searchQuery = searchForm.searchQuery.value;
    //trim() usuwa białe znaki (spacje, tabularory)
    //jeśli searchQuery jest puste, czyli uytkownik nic nie wpisał w inputa, robimy return przerywając
    //dalsze wykonywanie kodu (aby uniknąć wysyłania pustych ządań do API)
    if (searchQuery.trim() === '') {
      return;
    }
    clearGallery();

    function searchImages(images, totalHits) {}
  });
});
