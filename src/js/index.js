/*
 * Flickr cat gallery source URL: 
 * https://www.flickr.com/photos/celeste/galleries/72157690638331410
 */
const flickrGalleryId = "72157690638331410"; 

const maxThumbnails = 15; 
const thumbnailContainer = document.getElementById('thumbnails');
const overlay = document.getElementById("overlay");
const nextBtn = document.getElementById("nextBtn");
const previousBtn = document.getElementById("previousBtn");
const imgModal = document.getElementById("image");
const imgTitle = document.getElementById("imgTitle");
let nextImgId;
let currentImgId;

const createThumbnail = (nr, url, title) => {
    let thumbnail = document.createElement('li');
    thumbnail.id = nr + 1;
    thumbnail.classList.add("thumbnail");
    thumbnail.innerHTML = '<img src="' + url + '" title="'+ title +'"/>';
    thumbnailContainer.appendChild(thumbnail);
}

// Load JSON data
const loadPhotos = (callback) => {
    var oReq = new XMLHttpRequest();
    oReq.overrideMimeType("application/json");
    oReq.open("GET", 'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=ea7a6c59a7448849dc354beb1518ac69&gallery_id='+flickrGalleryId+'&format=json&nojsoncallback=1', true);
    oReq.onreadystatechange = () => {
        if (oReq.readyState === 4 && oReq.status == "200") {
            callback(oReq.responseText);
        }
    }
    oReq.send(null);
}

// Parse JSON & populate data
loadPhotos((text) => {
    const data = JSON.parse(text);
    photo = data.photos.photo;
    
    for (let i = 0; i < maxThumbnails; i++) {
        const farmId = photo[i].farm;
        const serverId = photo[i].server;
        const id = photo[i].id;
        const secret = photo[i].secret;
        const title = photo[i].title;
        const imageUrl = 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg';

       createThumbnail(i, imageUrl, title);
    }
});

// Eventhandlers
thumbnailContainer.addEventListener("click", (e) => {
    
    // Image modal & title for each thumbnail
    imgModal.src = e.target.getAttribute("src");
    imgTitle.innerHTML = e.target.getAttribute("title");

    // Display overlay
    overlay.style.display = "block";
    setTimeout(function() {
        overlay.classList.add("show");
    }, 50);
    

    // Assign currentImgId variable to thumb clicked
    currentImgId = e.target.parentNode.id;

		// Hide prev & next btn on first & last image
    if (currentImgId >= maxThumbnails) {
        nextBtn.style.display = "none";
    } else if (currentImgId <= 1) {
        previousBtn.style.display = "none";
    }
});


// Lightbox: Get & load next img
const nextImage = (direction) => {
    if (direction == "prev") {
        nextImgID = Number(currentImgId) - 1;
    } else if (direction == "next") {
        nextImgID = Number(currentImgId) + 1;
    }

    // Assign img modal & title to next thumbnail
    imgModal.src = document.getElementById(nextImgID).firstChild.getAttribute("src");
    imgTitle.innerHTML = document.getElementById(nextImgID).firstChild.getAttribute("title");

    currentImgId = nextImgID;

    // Show/hide nextBtn
    if (currentImgId >= maxThumbnails) {
        nextBtn.style.display = "none";
    } else {
        nextBtn.style.display = "block";
    }

    // Show/hide previousBtn
    if (currentImgId <= 1) {
        previousBtn.style.display = "none";
    } else {
        previousBtn.style.display = "block";
    }
}


// Shut down lightbox
const closeBtn = document.getElementById("closeBtn");

closeBtn.onclick = () => {
    overlay.style.display = "none";
    overlay.classList.remove("show");

    currentImgId = "";
    nextBtn.style.display = "block";
    previousBtn.style.display = "block";
}
