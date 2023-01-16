import './css/common.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.6.min.css";
// import axios from "axios";

const searchForm = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]')
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;
let query = '';

const gallery = document.querySelector('.gallery');
const API_KEY = '32852633-0625716e22432e941df8357a0';

searchForm.addEventListener('submit', onSearch);

function onSearch(evt) {
    evt.preventDefault();
    gallery.innerHTML = '';
    query = input.value;
    
    fetchImages(query, page = 1)
    .then(data => {
        if (data.hits.length === 0) {
            return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        renderGallery(data.hits)
        loadMoreBtn.hidden = false;
    })
    .catch(err => console.log(err))
}

function fetchImages(query, page) {
    return fetch(`https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&q=${query}&page=${page}&per_page=40`)
    .then(resp => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
       
        return resp.json()})
}
 
function renderGallery(images) {
    
    const markup = images.map(image => `
    <a href="${image.largeImageURL}">
        <div class="photo-card">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" width="280px" height="140"/>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b><br>${image.likes}
                </p>
                <p class="info-item">
                    <b>Views</b><br>${image.views}
                </p>
                <p class="info-item">
                    <b>Comments</b><br>${image.comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b><br>${image.downloads}
                </p>
            </div>    
        </div>
    </a>
        `
    ).join('')

    gallery.insertAdjacentHTML('beforeend', markup);
}

loadMoreBtn.addEventListener('click', loadMore)

function loadMore() {
    page += 1;
    
    fetchImages(query, page)
    .then(data => {
        renderGallery(data.hits)
        console.log("Page " + page)
        
        
        const pages = data.totalHits / 40;
        // console.log("Pages ", pages)
        if (pages < page) {
            loadMoreBtn.hidden = true;
        }
    })
    .catch(err => console.log(err))
}

