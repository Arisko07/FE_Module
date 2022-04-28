
const cardListContainer = '../json/cardList.json';

let check = 0;
let card1 ="";        
let reset = 0;
let countUpTimer ="";
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let totalSeconds = 0;

fetchCards(4);

function flipCard(card){ 
    if(reset == 0 && countUpTimer == "") {
        countUpTimer = setInterval(countUp, 1000);
    }    
    let difficulty = document.querySelector("#board-type");            
    cardProtection = document.querySelector(".card-overlay");
    card.classList.add("flip");    
    check++;                  
    if(card == card1){check=1;}
    else if(check == 2 && (card.getAttribute("name") != card1.getAttribute("name"))){        
        cardProtection.classList.add("show");
        check = 0;
        setTimeout(() => {
            card.classList.remove("flip");
            card1.classList.remove("flip");                 
            cardProtection.classList.remove("show");                   
            }, 1000);                
    }
    else if(check == 1){
        card1 = card;
    }
    else{
        reset++;
        check=0;
        card.removeAttribute("onclick");
        card1.removeAttribute("onclick");
    }

    if(reset == difficulty.value){
        reset = 0;
        clearInterval(countUpTimer);
        setTimeout(() => {
            fetchCards(difficulty.value);
            countUpTimer = "";
            totalSeconds = 0;
            seconds.innerHTML = "00";
            minutes.innerHTML = "00";
        }, 4000);   
    }            
}     
async function fetchCards(difficulty){    
    const request = new Request(cardListContainer);
    const response = await fetch(request);
    const cardList = await response.json();            
    placeCards(cardList,difficulty)
} 
function placeCards(cardList,difficulty){            
    let cardContainer = document.querySelector(".card-container");
    let cardStack = cardList.cards.slice(0, difficulty);
    let cardHTML = `<div class="card-overlay"></div>`;
    cardContainer.classList.remove("expert","inter")
    if(difficulty == 16){cardContainer.classList.add("expert");}
    else if(difficulty == 9){cardContainer.classList.add("inter");}    
    cardStack = cardStack.concat(cardStack);
    shuffle(cardStack);
    cardStack.forEach( card => {
    cardHTML+=`
    <div class="card" name="${card.card_name}" onclick="flipCard(this)">
        <div class="card-front">
            <img src="../../img/cardBack.png">
        </div>
        <div class="card-back">
            <img src="../../img/${card.card_image}" style="object-fit: ${card.size_image}">
        </div>
    </div>
    `
    });          
    cardContainer.innerHTML = cardHTML;
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

function countUp()
{
    ++totalSeconds;
    seconds.innerHTML = pad(totalSeconds%60);
    minutes.innerHTML = pad(parseInt(totalSeconds/60));
}

function pad(val)
{
    var valString = val + "";
    if(valString.length < 2)
    {
        return "0" + valString;
    }
    else
    {
        return valString;
    }
}