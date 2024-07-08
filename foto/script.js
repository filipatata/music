const imgs = ["img/0.jpg", "img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.jpg", "img/7.jpg", "img/8.jpg", "img/9.jpg", "img/10.jpg", "img/11.jpg", "img/12.jpg"];

const imgWrapper = document.getElementById("gallery-wrapper");
let modal = document.getElementById('modal');

function showImages() {
    imgWrapper.innerHTML = "";

    for (let i = 0; i < imgs.length; i++) {
        imgWrapper.innerHTML += /*html*/ `
         <div class="img-container" onclick="showClickedImg(${i})">
                <img src="img/${i}.jpg" alt="">
            </div>
        `
    }
}

function showClickedImg(i) {
    modal.classList.add("modal-container");
    modal.classList.remove("hide-modal")
    imgModal(i);
    document.querySelector("body").style.overflow = 'hidden';
}

function imgModal(i) {
    modal.innerHTML = "";
    modal.innerHTML += /*html*/ `
    <div class="modal-content" id="modal-content">
            <div class="modal-image" id="modal-img">
                <img src="img/${i}.jpg" alt="" id="img${i}">
            </div>
            <button class="right-arrow" onclick="showNextImg(${i})">
                <img src="img/arrow-right.png" alt="" >
            </button>
            <button class="left-arrow" onclick="showPrevImg(${i})">
                <img src="img/left-arrow.png" alt="">
            </button>
            <button class="close-btn" onclick="closeModal()">
                    <img src="img/error.png" alt="">
                </button>
            </div>
            `
}

function showNextImg(i) {
    modal.classList.add("modal-container");
    modal.innerHTML = "";
    if (i === imgs.length - 1) {
        i = -1;
    }
    imgModal(i + 1)
}

function showPrevImg(i) {
    modal.classList.add("modal-container");
    modal.innerHTML = "";
    if (i === 0) {
        i = imgs.length;
    }
    imgModal(i - 1)
}

function closeModal() {
    modal.classList.add("hide-modal");
    document.querySelector("body").style.overflow = 'visible';
}

modal.addEventListener("click", function(e){
    if(e.target.closest("#modal-img") || e.target.closest(".left-arrow") || e.target.closest(".right-arrow") || e.target.closest(".close-btn")){
        return;
    }else {
        closeModal();
    }
})

// modal.addEventListener('ke')

