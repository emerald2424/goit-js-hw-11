
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
console.log(galleryItems);
// console.log(SimpleLightbox);


const markup = galleryItems.map(({ preview, original, description }) => 
`<li>
	<a class="gallery__item" href="${original}" onclick="return false";>
  		<img class="gallery__image" src="${preview}" alt="${description}" />
	</a>
</>`).join('');




const galleryUl = document.querySelector('.gallery');
galleryUl.insertAdjacentHTML('beforeend', markup);


let gallery = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionsDelay: 250,});
