let fruits = [
  "Mango",
  "Pears",
  "Orange",
  "Apricot",
  "Guava",
  "Grapes",
  "Apple",
  "Pineapple"
];
let num = Math.random();
let word = fruits[Math.ceil(num * fruits.length) - 1];
word = word.toLowerCase();
let l1n = Math.ceil(Math.random()*word.length) - 1;
let l2n = Math.ceil(Math.random()*word.length) - 1;

const generateHint = () => {
    l1n = Math.ceil(Math.random()*word.length) - 1;
    l2n = Math.ceil(Math.random()*word.length) - 1;
}

if(l1n === l2n){
  generateHint();
}

let letter1 = word[l1n];
let letter2 = word[l2n];

if(letter1 === letter2){
  generateHint();
}

let chances = 5;

//to count correct letters
let counter = 0;

//modal to display gameOver
let modal = document.getElementById("modal");


let heart = document.getElementById("lives");
for (let i = 0; i < chances; i++)
  heart.innerHTML += `<i class="fas fa-heart" id="${i.toString()}"></i>`;

let wordEl = document.getElementById("word");

for (let i = 0; i < word.length; i++) {
  let letter = document.createElement("div");
  //id will be "0","1","2","3","4"...
  letter.setAttribute("id", i.toString());

  //Assign class as the letter name from the word
  letter.className = word[i];
  letter.classList.add("text");
  wordEl.appendChild(letter);
}

const initHint = () => {
    let hint1 = document.getElementsByClassName(letter1);
    let hint2 = document.getElementsByClassName(letter2);

   

    //when there are two instances of same letter
    if(letter1===letter2){
      hint1[0].innerHTML = letter1;
      hint1[1].innerHTML = letter2;
      counter += hint1.length;
    }
    else{
    hint1[0].innerHTML = letter1;
    hint2[0].innerHTML = letter2;
    counter += hint1.length;
    counter += hint2.length;
    }

};

initHint();

const handleKeyDown = (event) => {
  let keyPressed = event.key.toLowerCase();


   
  //Get the className from the letter of the word. Each element has className as letter of the word
  //Means the pressed key is not in the word, so no elements are returned via className
  let elements = document.getElementsByClassName(keyPressed);
  let hangman = document.getElementById("hangman-image");
  

  if (elements.length === 0 && chances > 0) {
    chances--;
    let live = document.getElementById(chances);
    live.classList.remove("fas","fa-heart");
    console.log(word);
    hangman.setAttribute("src",`hangman${5-chances+1}.JPG` ) ;
  }
  //display the particular element,  howmanyever are there in the word
  for (let i = 0; i < elements.length; i++) {
    elements[i].innerHTML = keyPressed;

    if (keyPressed!==letter1 && keyPressed!==letter2){
          counter = counter + 1;}
  }

  //for losing
  if(chances === 0){
    setTimeout(() => {
      modal.classList.remove("hide");
      modal.style.display="block";
    }, 1500);
    
    return;
  }

  //for winning
  if (word.length === counter){
    let gameover = document.getElementById("gameover");
    gameover.innerHTML = "You Win!!";
    let modalbody = document.getElementById("modal-body");
    modalbody.setAttribute("src","crackers.gif" ) ;
  
    let ptag = document.getElementById("ptag");
    ptag.innerHTML = "Congratulations!!";

    setTimeout(() => {
      modal.classList.remove("hide");
      modal.style.display="block";
    }, 1000);
   

    return;
  }
 
};

let reloadButton = document.getElementById("reloadButton");

reloadButton.onclick = () => {
  window.location.reload();
};


let closeButton = document.getElementById("closeButton");

closeButton.onclick = () => {
  modal.style.display = "none";
};

document.addEventListener("keydown", handleKeyDown);

