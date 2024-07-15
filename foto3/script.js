let images = [
  './img/img1.jpg', './img/img2.jpg', './img/img3.jpg', './img/img4.jpg',
  './img/img5.jpg', './img/img6.jpg', './img/img7.jpg', './img/img8.jpg',
  './img/img9.jpg', './img/img10.jpg', './img/img11.jpg', './img/img12.jpg',
  './img/img13.jpg', './img/img14.jpg', './img/img15.jpg', './img/img16.jpg',
  './img/img17.jpg', './img/img18.jpg', './img/img19.jpg', './img/img20.jpg',
  './img/img21.jpg', './img/img22.jpg', './img/img23.jpg', './img/img24.jpg', 
  './img/img25.jpg', './img/img26.jpg', './img/img27.jpg', './img/img28.jpg', 
  './img/img29.jpg', './img/img30.jpg', './img/img31.jpg', './img/img32.jpg', 
  './img/img33.jpg', './img/img34.jpg', './img/img35.jpg', './img/img36.jpg', 
  './img/img37.jpg', './img/img38.jpg', './img/img39.jpg', './img/img40.jpg', 
  './img/img41.jpg', './img/img42.jpg', './img/img43.jpg', './img/img44.jpg', 
  './img/img45.jpg', './img/img46.jpg', './img/img47.jpg', './img/img48.jpg', 
  './img/img49.jpg', './img/img50.jpg', './img/img51.jpg', './img/img52.jpg', 
  './img/img53.jpg', './img/img54.jpg', './img/img55.jpg', './img/img56.jpg', 
  './img/img57.jpg', './img/img58.jpg', './img/img59.jpg', './img/img60.jpg'
];
let header = document.getElementById('header');
let imgContainer = document.getElementById('image-container');
let bigScreen = document.getElementById('bigScreen');
let symbols = document.getElementById('bigScreenSymbols');

let container1 = document.getElementById('container1');
let container2 = document.getElementById('container2');
let container3 = document.getElementById('container3');


function renderImages() {
  /*
  for (let i = 0; i < images.length; i++) {
    imgContainer.innerHTML += `
    <div class="img-box">
      <img onclick="openImg(${i})" src="${images[i]}">
    </div>
  `;
  }*/

  pushImgContainer(0, 2, container1)
  pushImgContainer(1, 2, container2)
  pushImgContainer(2, 2, container3)

};

function pushImgContainer(start, n, container) {
  for (let i = start; i < images.length; i++) {
    container.innerHTML += `
    <div class="img-box">
      <img onclick="openImg(${i})" src="${images[i]}">
    </div>
  `;
    i = i + n;
  }

}

function openImg(i) {
  bigPic()
  bigScreen.innerHTML += `
  <img src="${images[i]}">
  <div id="bigScreenSymbols" class="bigScreen-symbols">
  <i class="fas fa-times exit" onclick="closeImg()"></i>
  <div id="left-right">
    <i class="fas fa-chevron-circle-left icon-left" onclick="previousImg(${i})"></i>
    <i class="fas fa-chevron-circle-right icon-right" onclick="nextImg(${i})"></i>
  </div>
  `;

}

function bigPic() {
  header.classList.add('d-none');
  bigScreen.classList.remove('d-none');
  imgContainer.style = 'display: none';
  bigScreen.style = 'display: flex;'
  bigScreen.innerHTML = ''

}

function closeImg() {
  header.classList.remove('d-none');
  bigScreen.style = 'display: none'
  imgContainer.style = 'display: '
}

function previousImg(i) {
  i--
  if (i >= 0) openImg(i)
  else openImg(images.length - 1)
}

function nextImg(i) {
  i++
  if (i < images.length) openImg(i)
  else openImg(0)
}
