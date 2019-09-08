// $('#test').on('click', () => {
//   $('.questionBlock').append(`<p>Hey what is your name?</p>`)
// }); 

// Originally, I thought i could generate my own session token so this was my attempt at generating a random session ID on the client side.
// var sessionID = Math.random().toString(36).substr(2, 9);
// console.log(sessionID)

var ID
var num = 0;

function genID() {
  $.ajax({
    url: 'https://opentdb.com/api_token.php?command=request',
    method: "GET",
  }).then((response) => {
    console.log(`session token ID: ${response.token}`);
    return ID = response.token;
  });
} genID();


function askQuestion() {
  var queryURL = `https://opentdb.com/api.php?amount=10&category=15&token=${ID}`

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then((response) => {
    $('.questionBlock').append(`<p>${response.results[num].question}</p>`)

    if (response.results[num].type === 'boolean') {
      $('.answerBlock').append(`<p>True</p>`)
      $('.answerBlock').append(`<p>False</p>`)
    } else {
      $('.answerBlock').append(`<p>${response.results[num].correct_answer}</p>`)
      $('.answerBlock').append(`<p>${response.results[num].incorrect_answers[0]}</p>`)
      $('.answerBlock').append(`<p>${response.results[num].incorrect_answers[1]}</p>`)
      $('.answerBlock').append(`<p>${response.results[num].incorrect_answers[2]}</p>`)
    }
    num++;
  });
};

$('#test').on('click', () => {
  $('.questionBlock').empty();
  $('.answerBlock').empty();
  askQuestion();
})