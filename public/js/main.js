const deleteBtn = document.querySelectorAll('.del')
const addFav = document.getElementById('addFavorite')
const movieName = document.getElementById('movieName')

Array.from(deleteBtn).forEach(el => {
    el.addEventListener('click', deleteMovie)
})

addFav.addEventListener('click', addMovie)
movieName.addEventListener('click', addMovie)

async function deleteMovie() {
    const movieId = this.parentNode.dataset.id
    try {
        const response = await fetch('movies/deleteMovie', {
            method: 'delete',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                movieIdFromJSFile: movieId,
            }),
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

async function addMovie() {
    const movieTitle = movieName.innerText
    const movieYear = document.getElementById('movieYear').innerText
    try {
        const res = await fetch('/movies/addMovie', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                movieTitle: movieTitle,
                movieYear: movieYear,
            }),
        })
        const data = await res.json()
        console.log(data)
        location.assign('/movies')
    } catch (err) {
        console.log(err)
    }
}
