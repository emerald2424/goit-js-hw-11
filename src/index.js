import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "notiflix/dist/notiflix-3.2.6.min.css";
// import axios from "axios";

const searchForm = document.querySelector('#search-form');
const input = document.querySelector('input[name="searchQuery"]')
const btn = document.querySelector('btn[type="submit"]')


const gallery = document.querySelector('.gallery');
const API_KEY = '32852633-0625716e22432e941df8357a0';

searchForm.addEventListener('submit', onSearch);

function onSearch(evt) {
    evt.preventDefault();
    gallery.innerHTML = '';
    const query = input.value;
    
    fetchImages(query)
    .then(data => {
        if (data.hits.length === 0) {
            return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
        console.log(searchForm)
        console.log(query)
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
        renderGallery(data.hits)})
    .catch(err => console.log(err))
}

function fetchImages(query) {
    return fetch(`https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&q=${query}`)
    .then(resp => {
        if (!resp.ok) {
            throw new Error(resp.statusText);
        }
       
        return resp.json()})
}
 
function renderGallery(images) {
    
    const markup = images.map(image => `
        <div class="photo-card">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>${image.likes}
                </p>
                <p class="info-item">
                    <b>Views</b>${image.views}
                </p>
                <p class="info-item">
                    <b>Comments</b>${image.comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>${image.downloads}
                </p>
        </div>`
    ).join('')

    gallery.insertAdjacentHTML('beforeend', markup);
    
}