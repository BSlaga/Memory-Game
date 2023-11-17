const gameContainer = document.getElementById("game");
let start = document.querySelector('#start');
let restart = document.querySelector('#restart')
let score = document.getElementById('Score')
let topScore = document.getElementById('TopScore')

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

restart.addEventListener('click',function(e2){
  location.reload();
})

let topScore1 = JSON.parse(localStorage.getItem('topScore1'))
console.log(topScore1)
topScore.textContent= `Top Score: ${topScore1}`

start.addEventListener('click',function(e){

  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      const newDiv = document.createElement("div");
      newDiv.classList.add(color);
      newDiv.addEventListener("click", handleCardClick);
      newDiv.style.backgroundColor= 'black'
      gameContainer.append(newDiv);
    }
  }

  let match = [];
  let card1 = null;
  let card2 = null;
  cardMatchCount = 0;
  cardGuesses = 0
  topScore = 0;
  let noClicking = false;

  

  function handleCardClick(event){
    if(noClicking) return;
    //give cards their colors when clicked
    let currentCard = event.target;
    currentCard.style.backgroundColor = currentCard.classList[0];

    currentCard.classList.add("selected")
    match.push(event.target.className);

    //assign cards their class
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;

    //prevent cards from being double clicked
    if(card1 != null){
      card1.removeEventListener("click",handleCardClick);
    }if(card2 != null){
      card2.removeEventListener("click",handleCardClick);
    }if(card1 != null && card2 != null){
      noClicking = true;
      cardGuesses += 2;
      score.textContent= `Score: ${cardGuesses}`
    }
    //match cards
    if(match.length > 1){
      if(match[0] === match[1]){
        cardMatchCount += 2;
        console.log('match');
        card1 = null;
        card2 = null;
        noClicking = false;
      }else{
        //If cards dont match
        setTimeout(function(){
          card1.addEventListener("click",handleCardClick);
          card2.addEventListener("click",handleCardClick);
          card1.classList.remove("selected");
          card2.classList.remove("selected");
          card1.style.backgroundColor = 'black';
          card2.style.backgroundColor = 'black';
          card1 = null;
          card2 = null;
          noClicking = false;
        },1500)
      }
      match = [];
    }
    //Game Finish 
    if(cardMatchCount === COLORS.length){
      setTimeout(function(){
        alert("You win!")
      },1000)
      console.log(cardGuesses)
      if(topScore == 0 || cardGuesses < topScore){
      localStorage.setItem('topScore1',JSON.stringify(cardGuesses))
      }   
    }
  }
  
  // when the DOM loads
  createDivsForColors(shuffledColors);
});