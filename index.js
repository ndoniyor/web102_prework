/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for(let i=0; i < games.length; i++){
        // create a new div element, which will become the game card
        let game = games[i];
        let game_card = document.createElement("div");

        // add the class game-card to the list
        game_card.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        game_card.innerHTML = `
        <img src="${game.img}" class="game-img">
        <h2>${game.name}</h2>
        <p>${game.description}</p>
        <p>Pledged: $${game.pledged.toLocaleString('en-US')}/$${game.goal.toLocaleString('en-US')}</p>
        `;

        // append the game to the games-container
        gamesContainer.append(game_card);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers =  GAMES_JSON.reduce((amt, game) => {return amt + game.backers;},0);
contributionsCard.textContent = totalBackers.toLocaleString('en-US');
// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((amt, game) => {return amt + game.pledged;},0)
// set inner HTML using template literal
raisedCard.innerHTML = `<p>$${totalRaised.toLocaleString('en-US')}</p>`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.reduce((amt,game)=>{return amt+=1;},0);
gamesCard.textContent = totalGames;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter((game)=>{
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter((game)=>{
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click",filterFundedOnly);
allBtn.addEventListener("click",showAllGames);
// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedCount = GAMES_JSON.filter((game) => {
    return game.pledged < game.goal;
}).length;

const fundedCount = GAMES_JSON.filter((game) => {
    return game.pledged >= game.goal;
}).length;

// create a string that explains the number of unfunded games using the ternary operator
const displayStrSingular = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${totalGames} games.
Currently, ${unfundedCount} game remain unfunded. We need your help to fund these amazing games`;

const displayStrPlural = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${totalGames} games.
Currently, ${unfundedCount} games remain unfunded. We need your help to fund these amazing games`;

// create a new DOM element containing the template string and append it to the description container
const displayStringPar = document.createElement("p");
displayStringPar.innerHTML = unfundedCount > 1 ? `<p>${displayStrPlural}</p>` : `<p>${displayStrSingular}</p>`;

descriptionContainer.append(displayStringPar);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.slice(0).sort( (item1, item2) => {  
    //added slice to keep original json immutable, to avoid show all games showing different order than original layout
    return item2.pledged - item1.pledged;
});

const [topFunded, runnerUp, ...others] = sortedGames 

const firstGame = document.createElement("p"), secondGame = document.createElement("p");
firstGame.innerHTML = `${topFunded.name}`, secondGame.innerHTML = `${runnerUp.name}`;

firstGameContainer.append(firstGame);
secondGameContainer.append(secondGame);
// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item