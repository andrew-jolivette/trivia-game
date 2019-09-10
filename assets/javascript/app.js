// $('#test').on('click', () => {
//   $('.questionBlock').append(`<p>Hey what is your name?</p>`)
// }); 

// Originally, I thought i could generate my own session token so this was my attempt at generating a random session ID on the client side.
// var sessionID = Math.random().toString(36).substr(2, 9);
// console.log(sessionID)

var num = 0; 
var triviaArr = [];
var answerArr = [];
var answerID = 0;
var correctAnswer;
var wins = 0;
var loss = 0;
var ID
const url = `https://opentdb.com/api_token.php?command=request`
var queryURL = `https://opentdb.com/api.php?amount=10&category=15&token=${ID}`


$.ajax({
  url: 'https://opentdb.com/api_token.php?command=request',
  method: "GET",
}).then((response) => {
  console.log(`session token ID: ${response.token}`);
  ID = response.token;

  const url = `https://opentdb.com/api.php?amount=10&category=15&token=${ID}`
  $.ajax({
    url,
    method: "GET"
  }).then((response) => {
    for (let i=0; i < response.results.length; i++)
    triviaArr.push(response.results[i])
  })
});
// powered by: https://opentdb.com/


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
      if (answerArr[0] === "True") { // logic test to ensure the True option is on top and the False option is on bottom
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
        } while (answerArr.length > 0);
      };
    clickChoice();
    num++
  }

  $('#test').on('click', nextQuestion);


function clickChoice() {  // This needs to be re-worked using 'this'
  $('#choice1').on('click', () => {
    console.log($('#choice1').attr("value"))
    console.log(`Correct Answer: ${correctAnswer}`)
    if ($('#choice1').attr("value") === correctAnswer){
      console.log('Correct!')
      wins++;
      rightChoice();
    } else {
      console.log('Incorrect!')
      loss++;
      wrongChoice();
    }
  }); 
  $('#choice2').on('click', () => {
    console.log($('#choice2').attr("value"))
    console.log(`Correct Answer: ${correctAnswer}`)
    if ($('#choice2').attr("value") === correctAnswer){
      console.log('Correct!')
      wins++;
      rightChoice();
    } else {
      console.log('Incorrect!')
      loss++;
      wrongChoice();
    }
  }); 
  $('#choice3').on('click', () => {
    console.log($('#choice3').attr("value"))
    console.log(`Correct Answer: ${correctAnswer}`)
    if ($('#choice3').attr("value") === correctAnswer){
      console.log('Correct!')
      wins++;
      rightChoice();
    } else {
      console.log('Incorrect!')
      loss++;
      wrongChoice();
    }
  }); 
  $('#choice4').on('click', () => {
    console.log($('#choice4').attr("value"))
    console.log(`Correct Answer: ${correctAnswer}`)
    if ($('#choice4').attr("value") === correctAnswer){
      console.log('Correct!')
      wins++;
      rightChoice();
    } else {
      console.log('Incorrect!')
      loss++;
      wrongChoice();
    }
  }); 
}

function rightChoice() {
  timeReset();
  showWin();
};
function wrongChoice() {
  timeReset();
  showLoss();
};


function nextQuestion() {
  answerArr.length = 0; //clears array
  $('.questionBlock').empty();
  $('.answerBlock').empty();
  if (num < 10){
    askQuestion();
    $('#progress').html(`${num} / 10`)
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
    showTimeUp();
    loss++;
  }
}
// $('#timerTest').on('click', timeStart);
// $('#timerTest2').on('click', timeStop);
// $('#timerTest3').on('click', timeReset);

$('#startBlock').on('click', showGame)

function testGameOver() {
  if (num < 10) {
    showGame();
  } else {
    gameOver();
  }
}

function showStart() {
  $('#startBlock').show()
  $('#QnABlock').hide()
  $('#winBlock').hide()
  $('#lossBlock').hide()
  $('#timeUpBlock').hide()
  $('#gameOver').hide();
}
function showGame() {
  $('#startBlock').hide()
  $('#QnABlock').show()
  $('#winBlock').hide()
  $('#lossBlock').hide()
  $('#timeUpBlock').hide()
  $('#gameOver').hide();
  nextQuestion();
  timeStart();
}
function showWin() {
  $('#startBlock').hide()
  $('#QnABlock').hide()
  $('#winBlock').show()
  $('#lossBlock').hide()
  $('#timeUpBlock').hide()
  $('#gameOver').hide();
  timeReset();
  $('#winBlock').html(`Correct!`)
  setTimeout(testGameOver, 2000);
}
function showLoss() {
  $('#startBlock').hide()
  $('#QnABlock').hide()
  $('#winBlock').hide()
  $('#lossBlock').show()
  $('#timeUpBlock').hide()
  $('#gameOver').hide();
  timeReset();
  $('#lossBlock').html(`Wrong!<br><br>Correct Answer:<br> ${correctAnswer}`)
  setTimeout(testGameOver, 2000);
}
function showTimeUp() {
  $('#startBlock').hide()
  $('#QnABlock').hide()
  $('#winBlock').hide()
  $('#lossBlock').hide()
  $('#timeUpBlock').show()
  $('#gameOver').hide();
  timeReset();
  $('#timeUpBlock').html(`Wrong!<br><br>Correct Answer:<br> ${correctAnswer}`)
  setTimeout(testGameOver, 2000);
}
function gameOver() {
  $('#startBlock').hide()
  $('#QnABlock').hide()
  $('#winBlock').hide()
  $('#lossBlock').hide()
  $('#timeUpBlock').hide()
  $('#gameOver').show();
  // $('#playAgain').html(`Play Again?`)
  if (wins > loss) {
    $('#score').html(`You know your games! You got ${wins} out of 10 right!`)
  } else if(loss > wins) {
    $('#score').html(`I'm assigning you video game homework. You got ${loss} out of 10 wrong...`)
  }
  timeReset();
  // $('#playAgain').on('click', resetGame);
}

// function resetGame(){ // reset functionality WIP
//   num = 0; 
//   triviaArr = [];
//   answerArr = [];
//   answerID = 0;
//   wins = 0;
//   loss = 0;
  
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then((response) => {
//     for (let i=0; i < response.results.length; i++)
//     triviaArr.push(response.results[i])
//   })
//   showStart();
// }

// $('#showStart').on('click', showStart);
// $('#showGame').on('click', showGame);
// $('#showWin').on('click', showWin);
// $('#showLoss').on('click', showLoss);
// $('#showTimeUp').on('click', showTimeUp);







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