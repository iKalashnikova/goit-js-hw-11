import axios from 'axios';
import Notiflix from 'notiflix';
import PictureApiService from './components/api-service';

const formEl = document.querySelector('.search-form');
// const inputEl = document.querySelector('input');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const containerEl = document.querySelector('.gallery');

const pictureApiService = new PictureApiService();

formEl.addEventListener('submit', handleSearchPictures);
loadMoreBtn.addEventListener('click', onLoadMore);

function handleSearchPictures(evt) {
  evt.preventDefault();

  pictureApiService.query = evt.currentTarget.elements.searchQuery.value.trim();

  if (pictureApiService.query === '') {
    return;
  }
  evt.currentTarget.elements.searchQuery.value = '';

  pictureApiService.resetPage();

  pictureApiService
    .fetchPictures()
    .then(({ hits, totalHits }) => {
      // console.log(({ hits, totalHits }));
      if (hits.length === 0) {
        Notiflix.Notify.info(
          '"Sorry, there are no images matching your search query. Please try again."'
        );
        return;
      } 
    
      clearMarkupContainer();
      renderPictures(hits);

      loadMoreBtn.classList.remove('is-hidden');
    })
    .catch(err => console.log);
}

function onLoadMore() {
  pictureApiService
    .fetchPictures()
    .then(({ hits, totalHits })  => {
      renderPictures(hits);

      pictureApiService.page += 1;
      
      if (Math.ceil(totalHits / pictureApiService.perPage) === pictureApiService.page) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        
        loadMoreBtn.classList.add('is-hidden');

        return;
      }
    }
    )
    .catch(err => console.log);
}


function pictureMarkUp(card) {
  const galleryCard = ` <div class="photo-card">
  <img src="${card.webformatURL}" alt="" width='320' loading="lazy"/>
  <div class="info">
    <p class="info-item">
      <b>Likes:${card.likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${card.views}</b>
    </p>
    <p class="info-item">
      <b>Comments:${card.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${card.downloads}</b>
    </p>
  </div>
</div>`;

  galleryEl.insertAdjacentHTML('beforeend', galleryCard);
}

function renderPictures(array) {
  for (const card of array) {
    pictureMarkUp(card);
  }
}

function clearMarkupContainer() {
  containerEl.innerHTML = '';
}


