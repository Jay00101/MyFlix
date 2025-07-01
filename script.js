const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Load initial movies
getMovies(API_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = '';

    if (movies.length === 0) {
        main.innerHTML = '<h2 style="text-align:center; grid-column: 1 / -1;">No Movies Found</h2>';
        return;
    }

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview, release_date } = movie;

        if (!poster_path) return; // Skip movies with no poster

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span>${vote_average.toFixed(1)}</span>
                <div class="release-date">Release: ${release_date ? release_date : 'N/A'}</div>
            </div>
            <div class="overview">
                <h4>Overview:</h4>
                ${overview ? overview : 'No overview available.'}
            </div>
        `;

        main.appendChild(movieEl);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    if (searchTerm) {
        getMovies(SEARCH_API + searchTerm);
        search.value = '';
    } else {
        getMovies(API_URL);
    }
});
