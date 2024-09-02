/*Project : IPL Auction Project - JavaScript
Author : Dibyansh Pattanaik
*/

/*
    Step 1 - Global variables
*/
let timerInterval;
let currentTimer = 10; //1 minute
//If you want to set currentTimer to 2 minutes then you can go for 120.
//120 seconds
let playerIndex = -1;

/*
    Step 2 - Basic players rendering
    //<ul id="playersList" class="players-list"></ul>
    //We'll target the above-mentioned <ul> with it's id.
    //Then we'll show the data of players in a list.
*/
/*In step 2, we'll create an array object which will contain the information of players participating 
in the auction.*/
/*
  Players object with player info.
*/
//Array of objects.
const players = [
    {
        name: "Virat Kohli",
        country: "India",
        category: "Batsman",
        basePrice: 100
    },
    {
        name: "Brett Lee",
        country: "Austrailia",
        category: "Bowler",
        basePrice: 150
    },
    {
        name: "Moeen Ali",
        country: "England",
        category: "All-Rounder",
        basePrice: 200
    }
];

//Now we need to define a function to render the players.
function renderPlayers() {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = "";

    //forEach() works on Arrays.
    players.forEach((player, index) => {
        //With the help of document.createElement() method we can create HTML elements through JavaScript.
        const li = document.createElement("li");
        li.className = "player-item";
        li.id = `player${index}`;

        const playerDetails = document.createElement('div');
        playerDetails.className = "player-details";
        playerDetails.textContent = `${index + 1}.${player.name} - ${player.country} - ${player.category} - Base Price : $${player.basePrice}`;

        const startBidButton = document.createElement("button");
        startBidButton.className = "start-bid-button";
        startBidButton.textContent = "Start Bid";
        startBidButton.addEventListener("click", () => startBid(index));

        li.appendChild(playerDetails);
        li.appendChild(startBidButton);
        playersList.appendChild(li);
    });
}
renderPlayers();    //Function call

/* 
    Step 3 - Basic team rendering
    //We'll target the teams. We'll show the data of teams in a list.
*/
//Team object with team info.
//Object of objects.
const teams = {
    team1: { name: "Rajasthan Royals", budget: 400, players: [], bids: [] },
    team2: { name: "Chennai Super Kings", budget: 150, players: [], bids: [] },
    team3: { name: "Royal Challengers Bengaluru", budget: 100, players: [], bids: [] }
};


/*Function to render team widgets*/
function renderTeamWidgets() {
    for (const teamId in teams) {
        const teamWidget = document.getElementById(teamId);
        teamWidget.querySelector("h2").textContent = teams[teamId].name;
        updateTeamBudget(teamId, teams[teamId].budget);

        const bidButton = teamWidget.querySelector(".bid-now-button");
        bidButton.addEventListener("click", () => teamBid(teamId));
    }
}
function updateTeamBudget(teamId, budget) {
    document.getElementById(`budget-${teamId}`).textContent = `$${budget}`;
}
renderTeamWidgets(); // Function call

/*
    Step 4 - Start Bid Function(all teams allowed to bid)
    //Unless bidding is allowed to start, no team can start bidding. 
*/
function startBid(i) {
    playerIndex = i;//Set the player index
    // clearInterval(timerInterval);//Clear previous timer if any
    currentTimer = 10;// Reset the timer to 60 seconds
    timerInterval = 