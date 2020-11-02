const search = document.getElementById('search');
const submit = document.getElementById('submit');
const gamesEl = document.getElementById('games');
const resultHeading = document.getElementById('result-heading');
const single_gameEl = document.getElementById('single-game');
const error = document.querySelector('.error');

search.autocomplete = 'on';





//Search Game and fetch from API
function searchGame(e) {
    e.preventDefault();

    //Clear single game
    single_gameEl.innerHTML = '';

    //Get search term
    let term = search.value; 
    term = term.replace(/\s+/g, '-').toLowerCase();
    let encodedTerm = encodeURIComponent(term);

    //Check for empty
    if(term.trim()) {
        fetch(`https://api.rawg.io/api/games/${term}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            resultHeading.innerHTML = `<h2>Search Results for '${term}':</h2>`;
            

            if(encodedTerm === 'null') {
                resultHeading.innerHTML = `<p>There are no search results. Try again</p>`;
            } else {
                gamesEl.innerHTML = (`
                    <div class='game'>
                    <style>
                        .info {border-radius: 10px;}
                        .game-img {border-radius: 10px;}
                    </style>
                    <div class='divider'></div>
                        <img class='game-img responsive-img' src='${data.background_image}' alt='${data.name}' />
                        <div class='game-info' data-gameID='${data.id}'>
                            <div class='info purple lighten-5'>
                            <h3>${data.name}</h3>
                            <a class="waves-effect waves-light btn deep-purple lighten-3" href='${data.website}'>Website</a>
                            <a class="waves-effect waves-light btn deep-purple lighten-3" href='${data.reddit_url}'>Reddit</a>
                            <a class="waves-effect waves-light btn deep-purple lighten-3" href='${checkPurchase}'>Purchase</a>
                            <h5>Release Date: ${data.released}</h5>
                            <h5>Overall Rating: ${data.rating}</h5>
                            <h5>Playtime: ${data.playtime}</h5>
                            <h5>Achievements: ${data.achievements_count}</h5>
                            <h5>Genre: ${data.genres[0].name}</h5>
                            <p>${data.description}</p>
                            </div>
                        </div>
                `)

            }
        });
    } else  {
        alert('Please enter a game name!');
    }
}

//Check for Purchase Rating
const checkPurchase = () => {
   if (data.stores[i].url === "") {
       return "No data";
   } else {
       return data.stores[0].url;
   }
}

//Fetch Game by ID


//Event Listeners
submit.addEventListener('submit', searchGame);

gamesEl.addEventListener('click', e =>{
    const gameInfo = e.path.find(item =>{
        if(item.classList) {
            return item.classList.contains('game-info');
        } else {
            return false;
        }
    });

    if (gameInfo) {
        const gameID = gameInfo.getAttribute('data-gameid');
        getGameById(gameID);
    }
});
