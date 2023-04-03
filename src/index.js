import axios from 'axios';
import Notiflix from 'notiflix';
import PictureApiService from './components/api-service';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const formEl = document.querySelector('.search-form');
// const inputEl = document.querySelector('input');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const containerEl = document.querySelector('.gallery');

const pictureApiService = new PictureApiService();


const handleSearchPictures = async evt => {
  evt.preventDefault();

  pictureApiService.query = evt.currentTarget.elements.searchQuery.value.trim();

  if (pictureApiService.query === '') {
    return;
  }
  evt.currentTarget.elements.searchQuery.value = '';

  pictureApiService.resetPage();

  try {
    const { hits, totalHits } = await pictureApiService
      .fetchPictures();
  

    if (hits.length === 0) {
      Notiflix.Notify.warning(
        "Sorry, there are no images matching your search query. Please try again.");
        
      return;
    }

    Notiflix.Notify.info(` Hooray! We found ${totalHits} images.`);

    clearMarkupContainer();
    renderPictures(hits);

    loadMoreBtn.classList.remove('is-hidden');
  }
  catch (err) { console.log };
}

const onLoadMore = async() => {
  try {
    const { hits, totalHits } = await pictureApiService.fetchPictures();

    renderPictures(hits);

    if (Math.ceil(totalHits / pictureApiService.perPage) === pictureApiService.page) {
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
        
      loadMoreBtn.classList.add('is-hidden');
      return;
    }


  } catch (err) {
    console.log(err);
  }

};


function pictureMarkUp(card) {
  const galleryCard = ` <div class="photo-card"><a class="gallery__link" href="${card.largeImageURL}">
  <img src="${card.webformatURL}" alt="" width='320' loading="lazy"/></a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${card.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${card.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${card.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${card.downloads}</b>
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

formEl.addEventListener('submit', handleSearchPictures);
loadMoreBtn.addEventListener('click', onLoadMore);

// galleryEl.addEventListener('click', handleGalleryClick)



// function handleGalleryClick(event) {
//     event.preventDefault()

//     const lightbox = new SimpleLightbox('.gallery a', {   
//         captionPosition: 'bottom',
//         captionsData: 'alt',
//         captionDelay: 250});

//     const imageLink = event.target.closest('.gallery__item').href;

//     lightbox.open(imageLink)
// }


// ----------------------------------------------------------------

// import axios from 'axios';
// import Notiflix from 'notiflix';
// import PictureApiService from './components/api-service';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css"

// const formEl = document.querySelector('.search-form');
// // const inputEl = document.querySelector('input');
// const galleryEl = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');
// const containerEl = document.querySelector('.gallery');

// const pictureApiService = new PictureApiService();

// formEl.addEventListener('submit', handleSearchPictures);
// loadMoreBtn.addEventListener('click', onLoadMore);

// function handleSearchPictures(evt) {
//   evt.preventDefault();

//   pictureApiService.query = evt.currentTarget.elements.searchQuery.value.trim();

//   if (pictureApiService.query === '') {
//     return;
//   }
//   evt.currentTarget.elements.searchQuery.value = '';

//   pictureApiService.resetPage();

//   pictureApiService
//     .fetchPictures()
//     .then(({ hits, totalHits }) => {

//       // console.log(({ hits, totalHits }));
//       if (hits.length === 0) {
//         Notiflix.Notify.warning(
//           "Sorry, there are no images matching your search query. Please try again.");
        
//         return;
//       } 
//       Notiflix.Notify.info(` Hooray! We found ${totalHits} images.`);

//       clearMarkupContainer();
//       renderPictures(hits);

//       loadMoreBtn.classList.remove('is-hidden');
//     })
//     .catch(err => console.log);
// }

// function onLoadMore() {
  
//   pictureApiService
//     .fetchPictures()
//     .then(({ hits, totalHits })  => {
//       renderPictures(hits);

//       console.log(object);
//       console.log(pictureApiService.page);

//       if (Math.ceil(totalHits / pictureApiService.perPage) === pictureApiService.page) {
//         Notiflix.Notify.info(
//           "We're sorry, but you've reached the end of search results."
//         );
        
//         loadMoreBtn.classList.add('is-hidden');

//         return;
//       }
//     }
//     )
//     .catch(err => console.log);
// }


// function pictureMarkUp(card) {
//   const galleryCard = ` <div class="photo-card"><a class="gallery__link" href="${card.largeImageURL}">
//   <img src="${card.webformatURL}" alt="" width='320' loading="lazy"/></a>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes: ${card.likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views: ${card.views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments: ${card.comments}</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads: ${card.downloads}</b>
//     </p>
//   </div>
// </div>`;

//   galleryEl.insertAdjacentHTML('beforeend', galleryCard);
// }

// function renderPictures(array) {
//   for (const card of array) {
//     pictureMarkUp(card);
//   }
// }

// function clearMarkupContainer() {
//   containerEl.innerHTML = '';
// }


// galleryEl.addEventListener('click', handleGalleryClick)



// function handleGalleryClick(event) {
//     event.preventDefault()

//     const lightbox = new SimpleLightbox('.gallery a', {   
//         captionPosition: 'bottom',
//         captionsData: 'alt',
//         captionDelay: 250});

//     const imageLink = event.target.closest('.gallery__item').href;

//     lightbox.open(imageLink)
// }