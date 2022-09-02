const deleteBtn = document.querySelectorAll('.del')
// const addBtn = document.getElementById('addMovie')
// const movieName = document.getElementById('movieName')

Array.from(deleteBtn).forEach(el => {
    el.addEventListener('click', deleteMovie)
})

// if (addBtn) {
//     addBtn.addEventListener('click', addMovie)
// }
// if (movieName) {
//     movieName.addEventListener('click', addMovie)
// }

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

async function addMovie(id, title) {
    try {
        const res = await fetch('/movies/addMovie', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                movieId: id,
                movieTitle: title,
            }),
        })
        const data = await res
        // console.log(data)
        window.location.href = res.url
        // location.reload()
    } catch (err) {
        console.log(err)
    }
}
