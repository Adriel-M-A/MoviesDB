const API_KEY = '5bc256e0ccf35391931d89b92b1510a0';
const BASE_URL = 'https://api.themoviedb.org/3/';

const genresSelect = document.getElementById('genres');
const moviesList = document.getElementById('movies');

// Obtener lista de géneros
fetch(`${BASE_URL}genre/movie/list?api_key=${API_KEY}`)
.then(response => response.json())
.then(data => {
    const genres = data.genres;
    const select = document.getElementById('genres');
    // Crear opciones en el elemento select
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    });
})
.catch(error => console.log(error));

//Listar peliculas segun el genero
genresSelect.addEventListener('change', () => {
    const genreId = genresSelect.value;
    fetch(`${BASE_URL}discover/movie?api_key=${API_KEY}&with_genres=${genreId}`)
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        moviesList.innerHTML = '';
        movies.forEach(movie => {
            const movieItem = document.createElement('li');
            movieItem.textContent = movie.title;
            moviesList.appendChild(movieItem);
        });
    })
    .catch(error => console.log(error));
});