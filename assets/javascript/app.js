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
var correctAnswer;
var wins = 0;
var loss = 0;

// function genID() {
//   $.ajax({
//     url: 'https://opentdb.com/api_token.php?command=request',
//     method: "GET",
//   }).then((response) => {
//     console.log(`session token ID: ${response.token}`);
//     return ID = response.token;
//   });
// } genID();


// powered by: https://opentdb.com/

function genTrivia() {
  let queryURL = `https://opentdb.com/api.php?amount=10&category=15`;

  $.ajax({
    url: queryURL,
    method: "GET",
    // success: askQuestion()
  }).then((response) => {
    for (let i=0; i < response.results.length; i++)
    triviaArr.push(response.results[i])
  });
}

  genTrivia();
  timeReset();

  triviaArr.length = 0; // makes triviaArr ready for new inputs
  console.log(triviaArr)

  function askQuestion() {
    var numChoice = 1;

    $('.questionBlock').append(`<p>${triviaArr[num].question}</p>`)

      answerArr.push(triviaArr[num].correct_answer);
      for (let j=0; j < triviaArr[num].incorrect_answers.length; j++) {
        answerArr.push(triviaArr[num].incorrect_answers[j]);
      } console.log(answerArr)
      correctAnswer = answerArr[0];
      if (answerArr[0] === "True") {
        $('.answerBlock').append(`<p class="choiceBlock" id="choice1" value="True" value="correct">${answerArr[0]}</p>`)
        $('.answerBlock').append(`<p class="choiceBlock" id="choice2" value="False" value="incorrect">${answerArr[1]}</p>`)
      } else if (answerArr[1] === "True") {
        $('.answerBlock').append(`<p class="choiceBlock" id="choice1" value="False" value="incorrect">${answerArr[1]}</p>`)
        $('.answerBlock').append(`<p class="choiceBlock" id="choice2" value="True" value="correct">${answerArr[0]}</p>`)
      } else {
        do {
          answerID = Math.floor(Math.random() * answerArr.length);
          $('.answerBlock').append(`<p class="choiceBlock" id="choice${numChoice}" value="${answerArr[answerID]}">${answerArr[answerID]}</p>`)
          answerArr.splice(answerID, 1)
          numChoice++
        } while (answerArr.length > 0)
      }
    clickChoice();
    num++
  }

  $('#test').on('click', nextQuestion);

function clickChoice() {  
  $('#choice1').on('click', () => {
    console.log($('#choice1').attr("value"))
    console.log(`Correct Answer: ${correctAnswer}`)
    if ($('#choice1').attr("value") === correctAnswer){
      console.log('Correct!')
      wins++;
      // win transition
    } else {
      console.log('Incorrect!')
      loss++;
      // loss transition
    }
  }); 
  $('#choice2').on('click', () => {
    console.log($('#choice2').attr("value"))
    console.log(`Correct Answer: ${correctAnswer}`)
    if ($('#choice2').attr("value") === correctAnswer){
      console.log('Correct!')
      wins++;
    } else {
      console.log('Incorrect!')
      loss++;
    }
  }); 
  $('#choice3').on('click', () => {
    console.log($('#choice3').attr("value"))
    console.log(`Correct Answer: ${correctAnswer}`)
    if ($('#choice3').attr("value") === correctAnswer){
      console.log('Correct!')
      wins++;
    } else {
      console.log('Incorrect!')
      loss++;
    }
  }); 
  $('#choice4').on('click', () => {
    console.log($('#choice4').attr("value"))
    console.log(`Correct Answer: ${correctAnswer}`)
    if ($('#choice4').attr("value") === correctAnswer){
      console.log('Correct!')
      wins++;
    } else {
      console.log('Incorrect!')
      loss++;
    }
  }); 
}


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
var time = 30;
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
  timeStop();
  time = 30;
  $('#timer').text(`${time}`);
}

function count() {
  time--;
  $('#timer').text(`${time}`);
  if (time === 0){
    timeStop();
  }
}
$('#timerTest').on('click', timeStart);
$('#timerTest2').on('click', timeStop);
$('#timerTest3').on('click', timeReset);










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