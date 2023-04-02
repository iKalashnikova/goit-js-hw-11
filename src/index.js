import axios from "axios";
import Notiflix from "notiflix";
import PictureApiService from "./components/api-service";
export {renderPictures}


const formEl = document.querySelector('.search-form');
// const inputEl = document.querySelector('input');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const pictureApiService = new PictureApiService();


formEl.addEventListener('submit', handleSearchPictures);
loadMoreBtn.addEventListener('click', onLoadMore);
    
function handleSearchPictures(evt) {
    evt.preventDefault();

    pictureApiService.query = evt.currentTarget.elements.searchQuery.value.trim();

    if (pictureApiService.query === '') {
        return
    }
    
    pictureApiService.fetchPictures();

};

function onLoadMore() {
    pictureApiService.fetchPictures();
};


function pictureMarkUp(card) {
    const galleryCard =` <div class="photo-card">
  <img src="${card.webformatURL}" alt="" width='320' loading="lazy/>
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
</div>`
    
    galleryEl.insertAdjacentHTML('beforeend', galleryCard);
};


function renderPictures(array) {
    for (const card of array) {
         pictureMarkUp(card);
    }
}

