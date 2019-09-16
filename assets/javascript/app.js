 
var card = $("#quiz-area");
var countStartNumber = 30;
var questions = [{
 question: "Which company created League of Legends?",
 answers: ["EA", "Blizzard", "Ubisoft", "Riot Games"],
 correctAnswer: "Riot Games",
 image: "assets/images/riot.gif"
}, {
 question: "Which character is based off of Gumiho, the Korean mythology of a nine-tailed fox? ",
 answers: ["Xayah", "Warwick", "Ahri", "Teemo"],
 correctAnswer: "Ahri",
 image: "assets/images/ahri.gif"
}, {
 question: "Which champion is a ninja gone rogue from the Kinou Order? Although still part of it, she operates outside of its rules and regulations.",
 answers: ["Akali", "Kennen", "Katarina", "Zoe"],
 correctAnswer: "Akali",
 image: "assets/images/akali.gif"
}, {
 question: "Which pair of champions came out as a couple that have in game perks of being of playing together?",
 answers: ["Xayah & Rakan", "Lux & Garen", "Darius & Draven", "Irelia & Karma"],
 correctAnswer: "Xayah & Rakan",
 image: "assets/images/xayahandrakan.gif"
}, {
 question: "Which character collects souls to gain armor and magic resist?",
 answers: ["Vayne", "Lucian", "Morgana", "Thresh"],
 correctAnswer: "Thresh",
 image: "assets/images/thresh.gif"
}, {
 question: "What is Miss Fortune's first name? ",
 answers: ["Ashley", "Sarah", "Hannah", "Megan"],
 correctAnswer: "Sarah",
 image: "assets/images/misfortune.gif"
}, {
 question: "These mysterious, magical, and most-loved creatures originating from the Howling Abyss, what are they?",
 answers: ["Poros", "Teemos", "Pokemons", "Augmons"],
 correctAnswer: "Poros",
 image: "assets/images/poros.gif"
}, {
 question: "What is the name of the map that normal and ranked games are played on?",
 answers: ["Howling Abyss", "Twisted Tree Line", "Crystal Scar", "Summoners Rift"],
 correctAnswer: "Summoners Rift",
 image: "assets/images/the_rift.gif"
}, {
    question: "Tristana’s Buster Shot is an Homage to which Capcom character?",
    answers: ["Strider", "Mega Man", "R. Mika", "Albert Wesker"],
    correctAnswer: "Mega Man",
    image: "assets/images/mega_man.gif"
}, {
    question: "Which team has won the most World Championship?",
    answers: ["SK Telecom", "Counter Logic Gaming", "Fnatic", "GAM Esports"],
    correctAnswer: "SK Telecom",
    image: "assets/images/SKT.gif"
   }
];

var timer;
var game = {
 questions: questions,
 currentQuestion: 0,
 counter: countStartNumber,
 correct: 0,
 incorrect: 0,
 countdown: function() {
   this.counter--;
   $("#counter-number").text(this.counter);
   if (this.counter === 0) {
     console.log("TIME UP");
     this.timeUp();
   }
 },
 loadQuestion: function() {
   timer = setInterval(this.countdown.bind(this), 1000);
   card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");
   for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
     card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
     + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
   }
 },
 nextQuestion: function() {
   this.counter = window.countStartNumber;
   $("#counter-number").text(this.counter);
   this.currentQuestion++;
   this.loadQuestion.bind(this)();
 },
 timeUp: function() {
   clearInterval(window.timer);
   $("#counter-number").text(this.counter);
   card.html("<h2>Out of Time!</h2>");
   card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
   card.append("<img src='" + questions[this.currentQuestion].image + "' />");
   if (this.currentQuestion === questions.length - 1) {
     setTimeout(this.results, 3 * 1000);
   }
   else {
     setTimeout(this.nextQuestion, 3 * 1000);
   }
 },
 results: function() {
   clearInterval(window.timer);
   card.html("<h2>All done, heres how you did!</h2>");
   $("#counter-number").text(this.counter);
   card.append("<h3>Correct Answers: " + this.correct + "</h3>");
   card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
   card.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
   card.append("<br><button id='start-over'>Start Over?</button>");
 },
 clicked: function(e) {
   clearInterval(window.timer);
   if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
     this.answeredCorrectly();
   }
   else {
     this.answeredIncorrectly();
   }
 },
 answeredIncorrectly: function() {
   this.incorrect++;
   clearInterval(window.timer);
   card.html("<h2>Nope!</h2>");
   card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
   card.append("<img src='" + questions[this.currentQuestion].image + "' />");
   if (this.currentQuestion === questions.length - 1) {
     setTimeout(this.results.bind(this), 3 * 1000);
   }
   else {
     setTimeout(this.nextQuestion.bind(this), 3 * 1000);
   }
 },
 answeredCorrectly: function() {
   clearInterval(window.timer);
   this.correct++;
   card.html("<h2>Correct!</h2>");
   card.append("<img src='" + questions[this.currentQuestion].image + "' />");
   if (this.currentQuestion === questions.length - 1) {
     setTimeout(this.results.bind(this), 3 * 1000);
   }
   else {
     setTimeout(this.nextQuestion.bind(this), 3 * 1000);
   }
 },
 reset: function() {
   this.currentQuestion = 0;
   this.counter = countStartNumber;
   this.correct = 0;
   this.incorrect = 0;
   this.loadQuestion();
 }
};

$(document).on("click", "#start-over", game.reset.bind(game));
$(document).on("click", ".answer-button", function(e) {
 game.clicked.bind(game, e)();
});
$(document).on("click", "#start", function() {
 $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
 game.loadQuestion.bind(game)();
});

