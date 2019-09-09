// $('#test').on('click', () => {
//   $('.questionBlock').append(`<p>Hey what is your name?</p>`)
// }); 

// Originally, I thought i could generate my own session token so this was my attempt at generating a random session ID on the client side.
// var sessionID = Math.random().toString(36).substr(2, 9);
// console.log(sessionID)

// var ID
var num = 0; 
var triviaArr = [];
var answerArr = [];
var answerID = 0;

// function genID() {
//   $.ajax({
//     url: 'https://opentdb.com/api_token.php?command=request',
//     method: "GET",
//   }).then((response) => {
//     console.log(`session token ID: ${response.token}`);
//     return ID = response.token;
//   });
// } genID();

function genTrivia() {
  let queryURL = `https://opentdb.com/api.php?amount=10&category=15`;

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then((response) => {
    for (let i=0; i < response.results.length; i++)
    triviaArr.push(response.results[i])
  });
} genTrivia()

// function startGame() {
  timeReset();
  triviaArr.length = 0; // makes triviaArr ready for new inputs
  console.log(triviaArr)

  function askQuestion() {
    $('.questionBlock').append(`<p>${triviaArr[num].question}</p>`)

      answerArr.push(triviaArr[num].correct_answer);
      for (let j=0; j < triviaArr[num].incorrect_answers.length; j++) {
        answerArr.push(triviaArr[num].incorrect_answers[j]);
      } console.log(answerArr)
      if (answerArr[0] === "True") {
        $('.answerBlock').append(`<p class="choiceBlock">${answerArr[0]}</p>`)
        $('.answerBlock').append(`<p class="choiceBlock">${answerArr[1]}</p>`)
      } else if (answerArr[1] === "True") {
        $('.answerBlock').append(`<p class="choiceBlock">${answerArr[1]}</p>`)
        $('.answerBlock').append(`<p class="choiceBlock">${answerArr[0]}</p>`)
      } else {
        do {
          answerID = Math.floor(Math.random() * answerArr.length);
          $('.answerBlock').append(`<p class="choiceBlock">${answerArr[answerID]}</p>`)
          answerArr.splice(answerID, 1)
        } while (answerArr.length > 0)
      } 
    num++
  };

  $('#test').on('click', nextQuestion);
//  

function nextQuestion() {
  answerArr.length = 0; //clears array
  $('.questionBlock').empty();
  $('.answerBlock').empty();
  if (num < 10){
    askQuestion();
  } else {
    num = 0;
  }
}

var clockRunning = false;
var time = 5;
var intervalID;

function timeStart() {
  if (!clockRunning && time != 0) {
    intervalID = setInterval(count, 1000);
    clockRunning = true;
  }
}
function timeStop() {
  clearInterval(intervalID);
  clockRunning = false;
}
function timeReset() {
  time = 5;
  $('#timer').text(`${time}`);
}

function count() {
  time--;
  $('#timer').text(`${time}`);
  if (time === 0){
    timeStop();
  }
}











// else {
//   $('.answerBlock').append(`<p class="choiceBlock">${triviaArr[num].correct_answer}</p>`)
//   $('.answerBlock').append(`<p class="choiceBlock">${triviaArr[num].incorrect_answers[0]}</p>`)
//   $('.answerBlock').append(`<p class="choiceBlock">${triviaArr[num].incorrect_answers[1]}</p>`)
//   $('.answerBlock').append(`<p class="choiceBlock">${triviaArr[num].incorrect_answers[2]}</p>`)
// }


// function askQuestion() {
//   var queryURL = `https://opentdb.com/api.php?amount=10&category=15&token=${ID}`

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then((response) => {
//     $('.questionBlock').append(`<p>${response.results[num].question}</p>`)

//     if (response.results[num].type === 'boolean') {
//       $('.answerBlock').append(`<p>True</p>`)
//       $('.answerBlock').append(`<p>False</p>`)
//     } else {
//       $('.answerBlock').append(`<p>${response.results[num].correct_answer}</p>`)
//       $('.answerBlock').append(`<p>${response.results[num].incorrect_answers[0]}</p>`)
//       $('.answerBlock').append(`<p>${response.results[num].incorrect_answers[1]}</p>`)
//       $('.answerBlock').append(`<p>${response.results[num].incorrect_answers[2]}</p>`)
//     }
//     num++;
//   });
// };

// $('#test').on('click', () => {
//   $('.questionBlock').empty();
//   $('.answerBlock').empty();
//   askQuestion();
// })