/*
 * Variables to hold for submission of name input
 */

 const name = document.getElementById('game-name');
 const submitButton = document.getElementById('submit');
 const welcomeContainer = document.getElementById('welcome');
 const gameContainer = document.getElementById('game');

/*
 * Create a list that holds all of your cards
 */
let card = document.getElementsByClassName("card");
let cardList = [...card];

/*
 * Varibles to hold deck,moves,restart etc
 */
const deck = document.querySelector('.deck');
let moves = document.querySelector('.moves');
const restart = document.querySelector('.restart').firstElementChild;

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

//Set initial values to the open cards an move counter
let openCards = [];
let movesCounter = 0;

//variable for overlay
const overlay = document.getElementById("overlay");

//On Submtting the name, set the value in welcome message
function submitName() {
  welcomeContainer.style.display = "none";
  gameContainer.style.display = "flex";
  let welcomeContent = document.querySelector(".welcomeName");
  welcomeContent.textContent = "Welcome, " + name.value ;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 *   - reset moves, stars and overlay
 */
function startGame(){
  //Shuffle cards
  cardList = shuffle(cardList);
  deck.innerHTML = "";
  movesCounter = 0;
  moves.innerHTML = movesCounter;
  overlay.style.display = "none";
  resetStars();
  for(let card of cardList){
      //Clear deck
      card.classList.remove("show","open","match","unmatched","disableClick");
      deck.appendChild(card)
  }
}

/*
 * Suffle the input array randomly
 *   @param {array} array - Array of cards
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


window.onload = startGame();

 /*
  * Event Listener function to listen to click on Deck
  */
 deck.addEventListener("click", function(event){
   if(event.target.type != "deck"){
     showCard(event);
     clickedCard(event);
   }
 });

 /*
  * Event Listener function to listen to click on restart
  */
 restart.addEventListener("click", function(event){
   startGame();
 });

 /*
  * Display card on click
  *   @param {event} event - The event when the user clicks
  */
 function showCard(event){
    event.target.classList.add("open","show");
 }

 /*
  * Assign the card based on the scenario
  *   @param {event} event - The event when the user clicks
  */
 function clickedCard(event){
   openCards.push(event.target);
   moveCounter();
   if(openCards.length < 2){
     openCards[0].classList.add("disableClick");
   }
   if(openCards.length === 2){
     if(openCards[0].children[0].classList.value === openCards[1].children[0].classList.value){
               cardsMatched();
               let matchedCards = document.querySelectorAll(".match").length;
               if(matchedCards === 16){
                 gameFinsihed();
               }
           } else {
               cardsUnmatched();
           }
     }
 }

 /*
  * Disable the card,if matched and also add match class name
  */
 function cardsMatched(){
   openCards[0].classList.add("match","disableClick");
   openCards[1].classList.add("match","disableClick");
   openCards = [];
 }

 /*
  * reset the card,if unmatched
  */
 function cardsUnmatched(){
   openCards[0].classList.add("unmatched");
   openCards[1].classList.add("unmatched","disableClick");
   deck.classList.add("disableClick");
   setTimeout(function(){
     openCards[0].classList.remove("show", "open","unmatched","disableClick");
     openCards[1].classList.remove("show", "open","unmatched","disableClick");
     openCards = [];
     deck.classList.remove("disableClick");
   },1000)
 }

 /*
  * Count the moves of the user and set the star rating
  */
function moveCounter(){
  movesCounter++;
  moves.innerHTML = movesCounter;

  if(movesCounter > 24){
    for(const [index,star] of stars.entries()){
      if(index > 1){
        star.style.color = "transparent";
      }
    }
  }

  if(movesCounter > 30){
    for(const [index,star] of stars.entries()){
      if(index > 0){
        star.style.color = "transparent";
      }
    }
  }
}

/*
 * Reset Start to original 3 stars
 */
function resetStars(){
   for(const star of stars){
     star.style.color = "#000";
   }
}

/*
 * Display Congratulations, if the user has succesfully finished the game
 */
function gameFinsihed(){
  var rating = document.querySelector(".stars").innerHTML;

   //showing move, rating, time on modal
   document.getElementById("userName").innerHTML = name.value;
   document.getElementById("moveCount").innerHTML = moves.textContent;
   document.getElementById("rating").innerHTML = rating;
   overlay.style.display = "block";
}

/*
 * Close function to close the popup
 */
function playAgain() {
  overlay.style.display = "none";
  startGame();
}
