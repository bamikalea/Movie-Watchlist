const contentEl = document.getElementById("content")
let data = JSON.parse(localStorage.getItem("savedMovies"))

function renderSavedMovies(){
    if (data){
        contentEl.innerHTML = ""
        for (let movie of data){
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
                            <div class="flex-row remove-from-watchlist-btn" onclick = removeMovie("${movie.imdbID}")>
                                <img src="img/remove-icon.svg" alt="add-icon">
                                <p>Remove</p>
                            </div>
                        </div>
                        <p class="plot">${movie.Plot}</p>
                    </div>
                </div>`
            contentEl.innerHTML += html
        }
    } else contentEl.innerHTML = ` 
        <div class="watchlist-empty-state">
            <h4>Your watchlist is looking a little empty...</h4>
            <a href="index.html" ><img src="img/add-Icon.svg" alt="add-icon">Let’s add some movies!</a>
        </div>`
}

renderSavedMovies()

function removeMovie(itemId){
    data.splice(itemId, 1)
    localStorage.setItem("savedMovies", JSON.stringify(data))
    renderSavedMovies()
}