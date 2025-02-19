let previous = document.querySelector('#pre'),
    play = document.querySelector('#play'),
    next = document.querySelector('#next'),
    title = document.querySelector('#title'),
    volume_icon = document.querySelector('#volume_icon'),
    volume_show = document.querySelector('#volume_show'),
    slider = document.querySelector('#duration_slider'),
    full_duration = document.querySelector('#full_duration'),
    passed_duration = document.querySelector('#passed_duration'),
    track_image = document.querySelector('#track_image'),
    track_name = document.querySelector('#trackName'),
    present = document.querySelector('#present'),
    total = document.querySelector('#total'),
    artist = document.querySelector('#artist'),
    main = document.querySelector('#main'),
    list = document.querySelector('#list'),
    mobi_list = document.querySelectorAll('.track_list'),
    // repeat = document.querySelector('#repeat'),
    // shuffle = document.querySelector('#shuffle'),
    menu_btn = document.querySelector(".menu-btn"),
    sidenav = document.querySelector(".sidenav"),
    play_open = document.querySelector(".play-open"),
    playlist = document.querySelector(".playlist");

let timer, link, All_song, max, gen, col, col2, col3 ,index_no;

// for mobile sidenav
const iconElement = menu_btn.querySelector('i');
menu_btn.addEventListener("click", () => {
    if (menu_btn.classList.contains("active")) {
        menu_btn.classList.remove("active");
        sidenav.style.left = "-100%";
        iconElement.classList.add('bi-list');
        iconElement.classList.remove('bi-x-square-fill');
        
    } else {
        menu_btn.classList.add("active");
        sidenav.style.left = "0"
        iconElement.classList.remove('bi-list');
        iconElement.classList.add('bi-x-square-fill');    
    }
});

playlist.addEventListener("click", () => {
    if (!list.classList.contains("play_open")) {
        list.classList.add("play_open");
    } else {
        list.classList.remove("play_open");
    }
})

const id = new URLSearchParams(window.location.search).get('id');
const url = `https://filipatata.github.io/music/songs.json`;

const renderDetails = async () => {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            All_song = data.songs;
            max = All_song.length;
            if (!id) {
                console.error('ID is missing in the URL, hence playing first song');
                index_no = 0;
                GetAllSongs(index_no);
            } else {
                const song = All_song.find(song => song.id === id.toString());
                if (song) {
                    index_no = parseInt(song.id) - 1;
                    GetAllSongs(index_no);
                    const currentURL = window.location.href;
                    const parts = currentURL.split('?');
                    const urlBeforeQuery = parts[0];
                    window.history.pushState("Tarana", "Tarana", urlBeforeQuery);
                } else {
                    console.error('Song not found, hence playing first song.');
                    index_no = 0;
                    GetAllSongs(index_no);
                    const currentURL = window.location.href;
                    const parts = currentURL.split('?');
                    const urlBeforeQuery = parts[0];
                    window.history.pushState("Tarana", "Tarana", urlBeforeQuery);
                }
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

window.addEventListener('DOMContentLoaded', renderDetails());

function shareplay() {
    // Function to handle sharing options
    const copyLink = document.getElementById('copyLink');
    copyLink.onclick = () => {
        var songlink = `https://filipatata.github.io/music/?id=${index_no + 1}`;
        navigator.clipboard.writeText(songlink)
            .then(() => {
                alert("Song link copied to clipboard " + songlink);
            })
            .catch((error) => {
                console.error('Error copying link to song: ', error);
            });
    }

    const whshare = document.getElementById('whshare');
    whshare.href = `https://api.whatsapp.com/send/?text=https://filipatata.github.io/music/?id=${index_no + 1}`
}

// creating an audio Element.
let track = document.createElement('audio');


function GetAllSongs(index_no) {
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_name.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();
    timer = setInterval(range_slider, 1000);
    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
    All_song.forEach(element => {
        genLink(element);
    });
}


function genLink(e) {
    link = document.createElement('li');
    link.innerHTML = `<span class="s-name">${e.name}</span><br><span class="s-artist">${e.singer}</span>`;

    link.addEventListener('click', function () {
        index_no = e.id - 1;
        track.src = All_song[e.id - 1].path;
        title.innerHTML = All_song[e.id - 1].name;
        track_name.innerHTML = All_song[e.id - 1].name;
        track_image.src = e.img;
        artist.innerHTML = e.singer;
        present.innerHTML = All_song[e.id - 1].id;
        reset_slider();
        playsong();
    });

    mobi_list.forEach(lists => {
        lists.append(link);
    });
}

var first_click = true;
pausesong();

play.onclick = function () {
    if (first_click) {
        playsong();
        first_click = false;
    } else {
        pausesong();
        first_click = true;
    }
}

var first = true;

// sound functions
var curVolume, curVolVal;

function mute_sound() {
    curVolVal = recent_volume.value;
    curVolume = recent_volume.value / 100;
    track.volume = 0;
    volume.value = 0;
    volume_show.innerHTML = 0;
}

function reset_sound() {
    track.volume = curVolume;
    volume.value = curVolVal;
    volume_show.textContent = curVolVal;
}

// change volume
function volume_change() {
    volume_icon.title = "Mute";
    if (volume_icon.classList.contains('fa-volume-off')) {
        first = true;
        volume_icon.classList.add('fa-volume-up');
    }
    volume_show.textContent = recent_volume.value;
    track.volume = recent_volume.value / 100;
    if (track.volume == 0) {
        first = false;
        volume_icon.title = "Unmute";
        volume_icon.classList.add('fa-volume-off');
        volume_icon.classList.remove('fa-volume-up');
    } else {
        first = true;
        volume_icon.title = "Mute";
        volume_icon.classList.remove('fa-volume-off');
        volume_icon.classList.add('fa-volume-up');
    }
}

// reset song slider
function reset_slider() {
    slider.value = 0;
}

// play song
function playsong() {
    shareplay();
    track.play();
    first_click = false;
    play.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
    play.title = "Pause";


    track_image.style.filter = `hue-rotate(0deg)`;
    
    track_image.style.transition = `transform 3s ease-out`;
    col2 = Math.floor(Math.random() * 360);    
    track_image.style.transform = `rotate(${col2}deg)`;
    track_image.style.transition = `transform 1s linear`;
}

// pause song
function pausesong() {
    track.pause();
    first_click = true;
    play.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
    play.title = "Play";
}

// next song
function next_song() {
    if (index_no < All_song.length - 1) {
        index_no += 1;
        out();
    } else {
        index_no = 0;
        out();
    }
}


// previous song
function previous_song() {
    if (index_no > 0) {
        index_no -= 1;
        out();
    } else {
        index_no = All_song.length - 1;
        out();
    }
}

var curmins, cursecs;

// change slider position
function change_duration() {
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

function changeDur() {
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
    curmins = Math.floor(track.currentTime / 60), cursecs = Math.floor(track.currentTime - curmins * 60);

    if (cursecs < 10) {
        passed_duration.innerHTML = `${curmins} : 0${cursecs}`;
    } else {
        passed_duration.innerHTML = `${curmins} : ${cursecs}`;
    }
}

function range_slider() {
    let position = 0;
    // Update slider position
    if (!isNaN(track.duration)) {
        position = track.currentTime * (100 / track.duration);
        slider.value = position;

        curmins = Math.floor(track.currentTime / 60);
        cursecs = Math.floor(track.currentTime - curmins * 60);
        passed_duration.innerHTML = cursecs < 10 ? `${curmins} : 0${cursecs}` : `${curmins} : ${cursecs}`;

        var ang = Math.floor(cursecs + (curmins * 60));
        track_image.style.transform = `rotate(${ang}deg)`;        
        
        var durmins = Math.floor(track.duration / 60);
        dursecs = Math.floor(track.duration - durmins * 60);
        full_duration.innerHTML = dursecs < 10 ? `${durmins} : 0${dursecs}` : `${durmins} : ${dursecs}`;

        if (track.ended) {
            console.log("track ended");
            next_song(); // Play the next song
        } 
    }
}
    
function out() {
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_name.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();
    timer = setInterval(range_slider, 1000);
    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;
    track_image.style.filter = `hue-rotate(0deg)`;
    track_image.style.transform = `rotate(0deg)`;
    playsong();
}

// dark mode
var body = document.getElementById("body");
var m = document.getElementById("main");
var themebtn = document.getElementById("themebutton");
var fc = true;

const active_tab = document.querySelector(".active"),
    music_controls = document.querySelector(".music-controls"),
    music_player = document.querySelector(".music-player"),
    bi_btn = document.querySelectorAll(".bi-btn"),
    song_slate = document.querySelector(".song-slate"),
    list_hover = document.querySelectorAll(".sub-nav-list"),
    playlist_hover = document.querySelectorAll(".track_list li");

// ch();

function n_ch() {
   var anotherRandom = Math.floor(Math.random() * 360);
    
   col1 = Math.floor(Math.random() * 30);
   track_image.src = All_song[col1].img; 
    
   col = anotherRandom;
   track_image.style.filter = `hue-rotate(${col}deg)`;

//   col2 = Math.floor(Math.random() * 360);    
//   track_image.style.transform = `rotate(${col2}deg)`;
}

function ch() {
    body.style.backgroundColor = "white";
    m.style.backgroundColor = "#FFFAFA";
    sidenav.style.backgroundColor = "#36260c";
    playlist.style.color = "black";
    active_tab.style.backgroundColor = "#072888";
    music_controls.style.backgroundColor = "#5a75c6 ";
    music_player.style.background = "#0c0700";
    // music_player.style.background = "linear-gradient(#0a388e 1%, #b1f0f7 80%)";
    // shuffle.style.backgroundColor = "#0876ec";
    // repeat.style.backgroundColor = "#0876ec";
    song_slate.style.color = "black";
    play.style.backgroundColor = "#2d349f";
    console.log("formatowanie uruchomione");

    bi_btn.forEach(btn => {
        btn.style.backgroundColor = "#143599"
    });

    list_hover.forEach(list => {
        list.addEventListener("mouseover", () => {
            list.style.backgroundColor = "rgb(7, 40, 136)";
        });
    })
    list_hover.forEach(list => {
        list.addEventListener("mouseout", () => {
            if (!list.classList.contains("active")) {
                list.style.backgroundColor = "transparent";
            }
        });
    })

    playlist_hover.forEach(list => {
        list.addEventListener("mouseover", () => {
            list.style.backgroundColor = "red";
        });
    })
    playlist_hover.forEach(list => {
        list.addEventListener("mouseout", () => {
            list.style.backgroundColor = "transparent";
        });
    });
}
