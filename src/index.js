import { onSubmit, onLoadMore } from './handlers.js';

//import * as dupsko from './fetch.js';
let searchForm;
let loadMoreButton;

window.addEventListener('load', function () {
  searchForm = document.querySelector('#search-form');
  loadMoreButton = document.querySelector('.load-more');

  searchForm.addEventListener('submit', onSubmit);
  loadMoreButton.addEventListener('click', onLoadMore);
});
