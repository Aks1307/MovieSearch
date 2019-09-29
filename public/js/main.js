const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchMovies = async searchText => {
    const res = await fetch('../data/DB.json')
    const movies = await res.json();

    let matches = movies.filter(movie => {
        const regex = new RegExp(`^${searchText}`, 'gi');

        let name = movie["Movie Name"];

        let altername = movie["Alt Text"];
        return name.match(regex) || altername.match(regex);
    });
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }
    outputHtml(matches);
}
const outputHtml = matches => {

    if (matches.length > 0) {
        const html = matches.slice(0, 10).map((match) => `
            <div class="card card-body mb-1">
            <h4 class="text-primary">${match["Movie Name"]}(${match["Alt Text"]})
            </h4>
            <h5>
            IMDB:<span class="text-primary">${match["IMDb Rating"]}</span>
           Language: <span class="text-primary">${match["Language"]}</span>
            </h5>
            </div>
            `).join('')
        matchList.innerHTML = html;
    }
}
search.addEventListener('input', () => searchMovies(search.value))