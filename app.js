const searchSongs = async () => {
    const searchText = document.getElementById('search-field').value;
    toggleSpiner()
    try {
        const url = `https://api.lyrics.ovh/suggest/${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    } catch (error) {
        displayError('Something Went Wrong!!, Please try agin later..');
    }
}

const displayError = error => {
    const errorTag = document.getElementById('error-meassage');
    errorTag.innerText = error;
}

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `;
        songContainer.appendChild(songDiv);
        toggleSpiner();
    });
}

const getLyric = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch (error) {
        displayError('Something Went Wrong!!, Please try agin later..');
    }
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}

const toggleSpiner = (show) => {
    const spinner = document.getElementById('loading-spinner');
    const songs = document.getElementById('song-container');
    spinner.classList.toggle('d-none');
    spinner.classList.toggle('d-flex');
    songs.classList.toggle('d-none')
}

//enter button function

document.getElementById('search-field').addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
        document.getElementById('search-button').click();
    }
})