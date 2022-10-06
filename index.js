
const contentEl = document.getElementById("content")
const emptyStateEl = document.getElementById("empty-state")
const searchEl = document.getElementById("search-input")
const formEl = document.getElementById("search-bar")
const addBtnEl = document.querySelector(".add-to-watchlist-btn")
const modalEl = document.getElementById("overlay")

let searchedMovies = []
let savedMovies = []

async function getMovies(){
    const res = await fetch(`https://www.omdbapi.com/?s=${searchEl.value}&apikey=ef23f869`)
    const data = await res.json()
    
    //fetch movie titles
    const movieTitles = data.Search.map(function(item){
        return item.Title
    })

    for (let title of movieTitles){
        const res = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=ef23f869`)
        const data = await res.json()
        searchedMovies.push(data)
    }

    const movieArray = [...new Map(searchedMovies.map((m) => [m.imdbID, m])).values()]; //remove duplicate movies
    renderMovie(movieArray)
}


function renderMovie(arg){
    for (let movie of arg){
        let html =`
        <div class="movie-item flex-row">
            <div class="movie-poster">
                <img src="${movie.Poster}" alt="movie-image">
            </div>
            <div class="movie-details">
                <div class="flex-row">
                    <h4>${movie.Title}</h4>
                    <img class="star-icon" src="img/star-Icon.svg" alt="rating-icon">
                    <p>${movie.imdbRating}</p>
                </div>
                <div class="flex-row movie-tags">
                    <p>${movie.Runtime}</p>
                    <p class="genre">${movie.Genre}</p>
                    <div class="flex-row add-to-watchlist-btn" onclick =addToWatchlist("${movie.imdbID}")>
                        <img src="img/add-Icon.svg" alt="add-icon">
                        <p>Watchlist</p>
                    </div>
                </div>
                <p class="plot">${movie.Plot}</p>
            </div>
        </div>`
        contentEl.innerHTML += html
    }
   
}

async function addToWatchlist(arg){
    const res = await fetch(`https://www.omdbapi.com/?i=${arg}&apikey=ef23f869`)
    const data = await res.json()
    savedMovies.unshift(data) //add selection to the begining of array
    const unique = [...new Map(savedMovies.map((m) => [m.imdbID, m])).values()]; //remove duplicate movies
    localStorage.setItem("savedMovies", JSON.stringify(unique))  //save to local storage
    showModal()
}

function showModal(){
    modalEl.style.display ="block"
    setTimeout( () => {
        modalEl.style.display ="none"
    }, 1500) 
}

formEl.addEventListener("submit", (e)=>{
    e.preventDefault()
    contentEl.innerHTML = ""
    getMovies()
})


