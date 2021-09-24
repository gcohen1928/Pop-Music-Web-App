// Created by Gabriel Cohen 

//Defines HTML elements that need to be defined. Refer to HTML file if you need to see what these point to
const main = document.getElementById('main')
const btn = document.getElementById('pressme')
const stats = document.getElementById('stats');
const instr = document.getElementById('instructions');
//Define var to hold response data from API
let chart = null;
//Array to hold current songs being quizzed
let songs = [];

//Method to handle error making a request.
//Updates webpage to show that an error occured
const handleError = () => {
  btn.remove();
  stats.remove();
  instr.remove(); 
  const msg = document.createElement('h1');
  const msg2 = document.createElement('h1')
  const br = document.createElement('br');
  const hr = document.createElement('hr');
  msg.classList.add('text-center', 'mt-2', 'text-danger');
  msg2.classList.add('text-center');
  msg.innerText = "Uh Oh! For some reason, the request to the Billboard Site was not resolved. Refresh the page and try again!"
  main.appendChild(msg);
  msg2.innerText = 'Check to make sure server.js is running. If this keeps happening, keep refreshing.'
  msg2.innerText += ' It is likely an issue with Google Chrome and Axios';
  main.append(br, hr, msg2)
};

//Method to make request to my API
const makeRequest = async () => {
  const res = await axios.get('http://localhost:8000/api/top-100')
    .then(response => {
      chart = response.data;
      enablePlay();
    })
    .catch(handleError)
  console.log(chart);
}

//Method to choose random song from song list and adds it to song array 
const randomSong = (i) => {
  const num = Math.floor(Math.random() * 100);
  const song = chart[num];
  songs.push(parseInt(song.rank));
  return song;
}

//Method to determine order or songs' popularity. Returns a new array that repalces
//song ranking with 1, 2 or 3 depending on relative ranking
const processArray = (songs) => {
  let newArr = [];
  let min = Math.min(...songs);
  let max = Math.max(...songs);
  for (let i = 0; i < 3; ++i) {
    let cur = songs[i];
    if (cur === min)
      newArr[i] = 1;
    else if (cur === max)
      newArr[i] = 3;
    else
      newArr[i] = 2;
  }
  return newArr;
}

//Sets up card element for each song currently being quizzed in HTML 
const cardSetup = () => {
  const div = document.createElement('div');
  div.classList.add('card', 'p-0', 'mx-auto', 'mt-5', 'd-block');
  div.setAttribute('name', 'cards-game')
  div.style = 'width: 18rem'
  return div; 
}

//Creates image to go into card element in HTML 
const cardImageSetup = () => {
  const q = document.createElement('img');
  q.classList.add('card-img-top');
  q.src = './src/question-mark.png'
  return q
}

//Creates body to go into card element in HTML 
const cardBodySetup = () => {
  const div2 = document.createElement('div');
  div2.classList.add('card-body');
  return div2
}

//Creates input to go into card in HTML 
const inputContainer = () => {
  const div3 = document.createElement('div');
  div3.classList.add('input-group', 'mb-3');
  return div3;
}

//Creates Artist container to go into card in HTML 
const songArtist = (song) =>{
  const p = document.createElement('p');
  p.classList.add('card-text');
  p.innerText = song.artist;
  return p
}
//Creates song name container to go into card in HTML 
const songName = (song) => {
  const h5 = document.createElement('h5')
  h5.classList.add('card-title');
  h5.innerText = song.song
  return h5
}

//Creates label element to go into card in HTM: 
const labelSetup = () => {
  const label = document.createElement('label')
  label.classList.add('input-group-text')
  label.innerText = 'Rank # (1, 2, or 3)'
  return label; 
}
//Creates input element to go into card in HTML 
const inputSetup = (i) => {
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.type = 'text';
  input.classList.add('form-control')
  input.id = `answer${4 - i}`;
  return input; 
}

//Creates submit button for form when submitting answers
const createSubmit = () => {
  const submit = document.createElement('button');
  submit.id = 'ready';
  submit.type = 'submit'
  submit.classList.add('btn', 'btn-danger', 'd-block', 'col-lg-12', 'mt-3');
  submit.innerText = 'Submit Answers!'
  return submit;
}

//Creates and adds a card to the HTML page when a new game is starting
const addCard = (i) => {
  btn.hidden = true;
  btn.setAttribute('disabled', true);
  const song = randomSong();
  const div = cardSetup()
  const q = cardImageSetup();
  const div2 = cardBodySetup(); 
  const p = songArtist(song); 
  const h5 = songName(song); 
  const label = labelSetup(); 
  const input = inputSetup(i); 
  const hr = document.createElement('hr');
  const div3 = inputContainer(); 
  main.prepend(div);
  div.appendChild(q);
  div.appendChild(div2);
  div2.append(h5, hr, p, p, div3);
  div3.append(label, input);


}
//Defines variables to arbitrary elements
//Will later be reassigned to get input values 
let input1 = document.getElementById('main');
let input2 = document.getElementById('main');
let input3 = document.getElementById('main');

//WHen the game is started, event listener listens for a click 
if (main) {
  //When btn is clicked, removes previous song cards and adds new song cards
  btn.addEventListener('click', function () {
    const cards = document.getElementsByName('cards-game')
    instr.remove(); 
    if (cards.length != 0) {
      for (let i = 0; i < 3; ++i) {
        cards.item(0).remove();
      }
    }
    for (let i = 1; i < 4; ++i)
      addCard(i);
    const submit = createSubmit();
    main.appendChild(submit);
    //Reassigns input1,2 and 3 to inputs
    input1 = document.getElementById('answer1');
    input2 = document.getElementById('answer2');
    input3 = document.getElementById('answer3');
    songs = processArray(songs);
    console.log(songs)
  })
}

//Enables play again button when the current round is finished
const enablePlay = () => {
  btn.removeAttribute('disabled');
  btn.innerText = "Ready to Play"
}

//Creates header for showing whether the guess was correct or incorrect.
//Goes on top of each song card
const createHeader = (parent, msg, rank = null) => {
  const header = document.createElement('h5');
  header.innerText = msg;
  header.classList.add('card-header', 'text-center');
  if (msg === 'Correct!') {
    header.classList.add('text-success');
  } else {
    header.classList.add('text-danger')
    header.innerText += `! This song was actually #${rank}`
  }
  parent.prepend(header);
}
//Adds score to either correct or incorrect tally to keep track of score
const addScore = (el) => {
  el.innerText = parseInt(el.innerText) + 1
}

//Checks user's guess and compares it to the correct answer
//Also updates page and notifies user if their answer was correct or not
const checkAnswer = (guess, answer, display, d1, d2) => {
  if (parseInt(guess) === answer) {
    display.classList.add('border-success')
    createHeader(display, 'Correct!')
    addScore(d1)
  } else {
    display.classList.add('border-danger')
    createHeader(display, 'Fail', answer);
    addScore(d2);
  }
};

//Method to validate form when submitted
const validateFormOnSubmit = (answers) => {
  const cards = document.getElementsByName('cards-game');
  const score1 = document.getElementById('correct');
  const score2 = document.getElementById('wrong');
  checkAnswer(input1.value, songs[0], cards[0], score1, score2);
  checkAnswer(input2.value, songs[1], cards[1], score1, score2);
  checkAnswer(input3.value, songs[2], cards[2], score1, score2);
  btn.removeAttribute('hidden');
  btn.removeAttribute('disabled');
  btn.innerText = 'Play again!';
  const submit = document.getElementById('ready');
  submit.remove();
  songs = [];
}

//Makes request and logs request in console. 
if (makeRequest()) {
  console.log('Request Sent');
}
