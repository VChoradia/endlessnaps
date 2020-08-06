const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray=[];

//Count of images to be loaded
let isInitialLoad = true;
let initialCount = 5;
let count = 30;

// UnSplash API documentation
const apiKey = 'uhyGOlJRO0g-60xfeR8DP7MzA4nvhvWSWKU13lGv5qs';
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialCount}`;

//to load image
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages) {
        loader.hidden = true;
        ready = true;
    }

}

//To set attributes
function setAttributes(element,attributes) {
    for(const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}

//Create Elements for link and images
function displayPhotos()  {

    imagesLoaded = 0;
    totalImages = photosArray.length;

    //Run functionality for each object in photosArray
    photosArray.forEach( (photo) => {

        //Create <a> element for link to unsplash
        const item = document.createElement('a');
        // item.setAttribute('href',photo.links.html);
        // item.setAttribute('target','_blank');
        setAttributes(item, {
            href : photo.links.html,
            target : '_blank' 
        });

        //Create <img> element for photos
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt',photo.alt_description);
        // img.setAttribute('title',photo.alt_description);
        setAttributes(img , {
            src: photo.urls.regular,
            alt : photo.alt_description,
            title: photo.alt_description
        });

        //Event Listener, check when each photo is finished loading
        img.addEventListener('load', imageLoaded);

        //Put <img> inside <a>, then put both of them inside #imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}

async function getPhotos() {
    try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();

    if(isInitialLoad) {
        apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
        isInitialLoad = false;
    }

    displayPhotos();
    
    } catch(err) {
        //catch errors here
    }
}

//Infinite Scrolling Functionality
window.addEventListener('scroll' , () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight -1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();