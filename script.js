//
const section = document.querySelector('section');
const scoreCount = document.querySelector('.scoreCount');
const highScoreCount = document.querySelector('.highScore');

let score = 0;
let highScore = JSON.parse(localStorage.getItem('highscore')) || 100;


// Link Text
scoreCount.textContent = score;
highScoreCount.textContent = highScore;


//Create data for cards.

const getImages = () => [
  {imageSrc: './Photos/ciri & geralt.jpg', name: 'ciri & geralt'},
  {imageSrc: './Photos/ciri 2.jpg', name: 'ciri 2'},
  {imageSrc: './Photos/ciri.jpeg', name: 'ciri'},
  {imageSrc: './Photos/geralt and roach.jpg', name: 'geralt and roach'},
  {imageSrc: './Photos/geralt on cliff.png', name: 'geralt on cliff'},
  {imageSrc: './Photos/geralt sword swing.jpg', name: 'geralt sword swing'},
  {imageSrc: './Photos/geralt.jpg', name: 'geralt'},
  {imageSrc: './Photos/jaskier 2.jpg', name: 'jaskier 2'},
  {imageSrc: './Photos/jaskier.png', name: 'jaskier'},
  {imageSrc: './Photos/symbol.png', name: 'symbol'},
  {imageSrc: './Photos/toss a coin.png', name: 'toss a coin'},
  {imageSrc: './Photos/witcher.jpg', name: 'witcher'},
  {imageSrc: './Photos/ciri & geralt.jpg', name: 'ciri & geralt'},
  {imageSrc: './Photos/ciri 2.jpg', name: 'ciri 2'},
  {imageSrc: './Photos/ciri.jpeg', name: 'ciri'},
  {imageSrc: './Photos/geralt and roach.jpg', name: 'geralt and roach'},
  {imageSrc: './Photos/geralt on cliff.png', name: 'geralt on cliff'},
  {imageSrc: './Photos/geralt sword swing.jpg', name: 'geralt sword swing'},
  {imageSrc: './Photos/geralt.jpg', name: 'geralt'},
  {imageSrc: './Photos/jaskier 2.jpg', name: 'jaskier 2'},
  {imageSrc: './Photos/jaskier.png', name: 'jaskier'},
  {imageSrc: './Photos/symbol.png', name: 'symbol'},
  {imageSrc: './Photos/toss a coin.png', name: 'toss a coin'},
  {imageSrc: './Photos/witcher.jpg', name: 'witcher'}
];

//Randomize the pictures!
const randomize = () => {
  const cardData = getImages();
  
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

//Card Generator goes here
const cardGenerator = () => {
  const cardData = randomize();
  //Now will create the HTML elements
  cardData.forEach((item) => {
    const card = document.createElement('div');
    const face = document.createElement('img');
    const back = document.createElement('div');
    card.classList = 'card';
    face.classList = 'face';
    back.classList = 'back';
    //Attach info to the cards
    face.src = item.imageSrc;
    card.setAttribute('name', item.name);
    //Attach the cards to the section.
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    card.addEventListener('click', (e) => {
      card.classList.toggle('flipCard');
      
      checkCards(e);
      
    });
    card.addEventListener('touchend', (e) => {
      card.classList.toggle('flipCard');
      
      checkCards(e);
      
    });
  });
};

//check the cards that are clicked
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add('flipped');
  const flippedCards = document.querySelectorAll('.flipped');
  const toggleCard = document.querySelectorAll('.flipCard');
  //console.log(clickedCard);

  
  //Logic for flipping cards
  if(flippedCards.length === 2){
    
    if(flippedCards[0].getAttribute('name') === 
    flippedCards[1].getAttribute('name')
    ){
      
      //console.log('match!');
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        card.style.pointerEvents = 'none';
      })
    } else {
      //console.log('wrong');
      flippedCards.forEach(card => {
        card.classList.remove('flipped');
        setTimeout(() => card.classList.remove('flipCard'), 1000);
      }); 

      score++;
      scoreCount.textContent = score;
      
    }
    
  }
      
  //Run a check to see if we won
  if(toggleCard.length === 24){
    if(score < highScore){
      localStorage.setItem('highscore', JSON.stringify(score));
      highScore = score;
      highScoreCount.textContent = highScore;
    }
    
    openWinModal();

  }
};

//Restart button
const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll('.face');
  let cards = document.querySelectorAll('.card');
  section.style.pointerEvents = 'none';
  cardData.forEach((item, index) => {
    cards[index].classList.remove('toggleCard');
    cards[index].classList.remove('flipCard');
    //Randomize cards again
    setTimeout(() => {
      cards[index].style.pointerEvents = 'all';
      faces[index].src = item.imageSrc;
      cards[index].setAttribute('name', item.name);
      section.style.pointerEvents = 'all';
    }, 1000)
   
  });
  
  score = 0;
  scoreCount.textContent = score;

  //setTimeout(() => window.alert(text), 100);
};

//Pop up functions below
let dialog = document.getElementById('dialog');

function openModal() {
  dialog.showModal();
}
function closeModal() {
  dialog.close();
  restart();
}

let win = document.getElementById('win');

function openWinModal() {
  win.showModal();
}
function closeWinModal() {
  win.close();
  restart();
}



cardGenerator();
