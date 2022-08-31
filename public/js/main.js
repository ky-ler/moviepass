const deleteBtn = document.querySelectorAll('.del')

Array.from(deleteBtn).forEach(el => {
    el.addEventListener('click', deleteMovie)
})

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
