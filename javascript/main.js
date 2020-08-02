// Taking the user input
var search = document.querySelector('.js-search');
const icon = document.querySelector('.js-submit');
// search.placeholder = "thun msfnoi";
// console.log(search);
icon.addEventListener('click', (event) => {
    if (!search.value) {
        alert("You are missing song name :)")
    } else {
        var cards = document.querySelector('.cards');
        cards.innerHTML = null;
        SoundCloudAPI.searchSong(search.value);
    }
})
search.addEventListener('keydown', (event) => {
    if (event.which == 13) {
        if (!search.value) {
            alert("You are missing song name :)")
        }
        else {
            var cards = document.querySelector('.cards');
            cards.innerHTML = null;
            SoundCloudAPI.searchSong(search.value);
        }
    }
})


// Connecting and Quering SoundCloudAPI
var SoundCloudAPI = {};
SoundCloudAPI.init = () => {
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });
}
SoundCloudAPI.init();

SoundCloudAPI.searchSong = (trackName) => {
    // card Container
    var cards = document.querySelector('.cards');
    SC.get('/tracks', {
        q: trackName
    }).then((tracks) => {
        console.log(tracks);
        tracks.forEach(track => {
            var card = SoundCloudAPI.makeCard(track.artwork_url, track.uri, track.title)
            cards.appendChild(card);
        });
    });
}

// Displaying the results
SoundCloudAPI.makeCard = (imageUrl, songUrl, songTitle) => {

    var card = document.createElement('div');
    card.classList.add('card');

    var image = document.createElement('div');
    image.classList.add('image');

    var image_img = document.createElement('img');
    image_img.classList.add('image_img');
    image_img.src = imageUrl || "http://lorempixel.com/100/100/abstract/"
    image.appendChild(image_img);

    // content class 
    var content = document.createElement('div');
    content.classList.add('content');

    var header = document.createElement('div');
    header.classList.add('header');

    var songLink = document.createElement('a');
    songLink.href = songUrl;
    songLink.target = "_blank";
    songLink.innerHTML = songTitle;

    content.appendChild(header);
    header.appendChild(songLink);

    // Add to Playlist Button 
    var addToPlaylist = document.createElement('div');
    addToPlaylist.className = 'ui bottom attached button js-button';

    var icon = document.createElement('i');
    icon.className = "add icon";

    var addToPlaylistText = document.createElement('span');
    addToPlaylistText.innerHTML = "Add to Playlist";

    addToPlaylist.appendChild(icon);
    addToPlaylist.appendChild(addToPlaylistText);
    addToPlaylist.addEventListener('click', (event) => {
        SoundCloudAPI.addToSideBar(songUrl);
    })
    // Appending to Card Everything
    card.appendChild(image);
    card.appendChild(content);
    card.appendChild(addToPlaylist);

    return card;
}

// Add to playlist
SoundCloudAPI.addToSideBar = (musicURL) => {
    SC.oEmbed(musicURL, { auto_play: true }).then((oEmbed) => {
        var sideBar = document.querySelector('.js-playlist');
        var newSong = document.createElement('div')
        newSong.innerHTML = oEmbed.html
        console.log()
        sideBar.insertBefore(newSong, sideBar.firstChild);
        /* Auto Play not working, deprecated by Google Chrome, 
         reason being improve in user interaction */
        localStorage.setItem('songData', sideBar.innerHTML);
    });
}
var sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML = localStorage.getItem('songData');