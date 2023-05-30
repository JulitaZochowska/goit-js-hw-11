import Notiflix from 'notiflix';

export function loadPictures() {
  picturesAPI
    .get()
    .then(pictures => {
      let apiResponse;
      function showLoadMoreButton() {
        loadMoreButton.classList.add('visible');
      }
      function hideLoadMoreButton() {
        loadMoreButton.classList.remove('visible');
        Notiflix.Notify.info(
          'We are sorry, but you have reached the end of search results.'
        );
      }
      function displayImages(image) {
        images.forEach(image => {
          const card = createPhotoCard(image);
          gallery.appendChild(card);
        });
      }
      function createPhotoCard(image) {
        let picturesListItems;
        picturesListItems += `<div class="photo-card"> <img src="${country.flags.svg}" alt="${country.name.officiale}" loading="lazy" </img><div class="info"><p class="info-item"><b>Likes</b></p><p class="info-item"><b>Views</b></p><p class="info-item"><b>Comments</b></p><p class="info-item"><b>Downloads</b></p></div></div>`;
        pictureList.innerHTML = picturesListItems;
      }

      if (apiResponse === []) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        displayImages(images);
        if (totalHits > images.length) {
          showLoadMoreButton();
        }
        if (totalHits < images.length) {
          hideLoadMoreButton();
        }
      }
      loadMoreButton.addEventListener('click', event => {
        let currentPage = 1;
        currentPage++;
        displayImages(images);
        if (totalHits <= currentPage * 40) {
          hideLoadMoreButton();
        }
      });
    })
    .catch(e => {});
}
