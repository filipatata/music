let images = [];
let numberOfImages = 18; // 18 Bilder sind vorhanden

//alle Images laden
function loadImages() {
    generateArrayImages();
    for (i = 0; i < images.length; i++) {
        document.getElementById('images-container').innerHTML += /*html*/ `
            <img class="image-box" src="img/${i}.jpg" onclick="openImage(${i})">
        `;
    }
}

// Array generieren (brauchen wir hier noch kaum, hab es aber mal so versucht zu implementieren)
function generateArrayImages() {
    for (i = 0; i < numberOfImages; i++) {
        images[i] = new Image();
        images[i].src = `img/${i}.jpg`;
    }
}

// Popup mit großem Bild einblenden
function openImage(i) {
    showPopupScreen();
    loadDownloadButton(i);
    loadBigImage(i);
}

// großes Bild laden mit innerHTML
function loadBigImage(i) {
    document.getElementById('popup-content').innerHTML = '';
    document.getElementById('popup-content').innerHTML = /*html*/ `
        <img class="arrow-image" src="img/arrow-backward.png" onclick="previosPicture(${i})">
        <img class="image-big fadeIn" src="img/${i}.jpg">
        <img class="arrow-image" src="img/arrow-forward.png" onclick="followingPicture(${i})">
        `;
}

// einen Download-Button erstellen, mit dem man das aktuelle Bild i herunterladen kann
function loadDownloadButton(i) {
    document.getElementById('download-button-content').innerHTML = '';
    document.getElementById('download-button-content').innerHTML = /*html*/ `
        <a href="img/${i}.jpg" download> 
            <img class="arrow-image" src="img/download.png"> 
        </a>
    `;
}

// nächstes Bild (und richtigen Download-Button laden)
function previosPicture(i) {
    if (i > 0) {
        loadBigImage(i - 1);
        loadDownloadButton(i - 1);
    }
    else {
        loadBigImage(images.length - 1);
        loadDownloadButton(images.length - 1);
    }
}

// vorheriges Bild (und richtigen Download-Button laden)
function followingPicture(i) {
    if (i < images.length - 1) {
        loadBigImage(i + 1);
        loadDownloadButton(i + 1);
    }
    else {
        loadBigImage(0);
        loadDownloadButton(0);
    }
}

// Haupt-Seite anzeigen
function showPhotoGalery() {
    document.getElementById('entry-screen').classList.add('d-none');
    document.getElementById('gallery-main-window').classList.remove('d-none');
    document.getElementById('popup-screen').classList.add('d-none');
}

// Start-Popup anzeigen
function showEntryScreen() {
    document.getElementById('entry-screen').classList.remove('d-none');
    document.getElementById('gallery-main-window').classList.add('d-none');
    document.getElementById('popup-screen').classList.add('d-none');
}

// Popup Großbild einblenden
function showPopupScreen() {
    document.getElementById('entry-screen').classList.add('d-none');
    document.getElementById('gallery-main-window').classList.add('d-none');
    document.getElementById('popup-screen').classList.remove('d-none');
}

// Start-Popup grau einfärben, wenn man mit Maus über Sprechblase hovert
function colorEntryScreen() {
    document.getElementById('entry-screen').classList.add('entry-screen-grayscale');
}

function resetColorEntryScreen() {
    document.getElementById('entry-screen').classList.remove('entry-screen-grayscale');
}