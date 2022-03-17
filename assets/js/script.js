// Selects timer element by id
var timerEl = document.querySelector(".timer-count");
// Selects start button by class
var startButton = document.querySelector(".start-button");
// Selects content by class
var contentEl = document.querySelector(".content");
// Selects grade div by class. This div will display whether a user's choice is right or wrong
var gradeEl = document.querySelector(".grade");

// Create unordered list and list items for the answer choices
var unorderedList = document.createElement("ul");
// var listItems = document.createElement("li");    

// Global variable for time left
var secondsLeft = 0;
// New timer variable for displaying time left
var timer;
// New variable for user win
var Win = false;
// variable for the QuestionArray index
var index = 0;
// Penalty of 10s for incorrect answer
var penalty = 10;
// user score
var score = 0;

// Array containing the questions, question choices, and answers
var questionArray = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            "1. Strings",
            "2. Booleans",
            "3. Alerts",
            "4. Numbers"
        ],
        correctAnswer: "3. Alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within _____.",
        answers: [
            "1. Quotes",
            "2. Curly Brackets",
            "3. Square Brackets",
            "4. Parenthesis"
        ],
        correctAnswer: "4. Parenthesis"
    }
];



// The startQuiz function is called when the start button is clicked
function startQuiz() {
    // Set initial Win variable
    Win = false;
    // Update the secondsLeft variable
    secondsLeft = 75;

    startButton.disabled = true;

    startTimer();
}

// Timer function that begins at 0 and starts counting down from 75 when the start button is clicked
// Triggers winGame function is Win variable is true, or triggers loseGame if false
function startTimer() {
    // Sets interval in variable
    var timer = setInterval(function() {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        //Timer keeps counting down unless the user completes the quiz and there's still time left. Calls quizFinish function
        if(secondsLeft >= 0) {
            if (Win && secondsLeft > 0) {
                clearInterval(timer);
                quizFinish();
            }
        }

        // If the user hasn't finished the quiz before time ends then the quizFinish funcion is called
        if (secondsLeft === 0) {
            clearInterval(timer);
            quizFinish();
        }
    },1000);

    showQuestions();

}

// displays a new question and displays the answer choices as a list
function showQuestions() {
    // Clear current HTML
    contentEl.innerHTML = "";
    unorderedList.innerHTML = "";
    // listItems.innerHTML = "";

    // Questions will loop through until the length of the array is reached
    for (var i = 0; i < questionArray.length; i++) {
        var showQuestion = questionArray[index].question;
        var showChoices = questionArray[index].answers;
        
        contentEl.textContent = showQuestion;
    }

    // for each of the answer choices per question, each choice will be displayed as a list item and appened to the unordered list
    // If a user clicks on any list item then that will trigger the checkCorrect function
    showChoices.forEach(function (listFunction) {
        var listItems = document.createElement("li");
        listItems.textContent = listFunction;
        contentEl.appendChild(unorderedList);
        unorderedList.appendChild(listItems);
        listItems.addEventListener("click", (checkCorrect));
    })
}

// Checks if the answer the user selected is correct or not
function checkCorrect(event) {
    // The target event property returns the element that triggered the event
    var x = event.target;

    // checks the user clicks on a list item
    if (x.matches("li")) {

        // Checks user selected correct answer. If so "Correct!" is displayed and 10 points are added to their score
        if (x.textContent == questionArray[index].correctAnswer) {
            gradeEl.textContent = "Correct!";
            score += 10;

            // If the user selects the wrong answer, then 10 seconds is deducted from their time
        } else {
            gradeEl.textContent = "Wrong!";
            secondsLeft = secondsLeft - penalty;
            score = score - 10;
        }
    }

    // Clear text after 2 seconds
    setTimeout(function() {
        if (gradeEl.textContent == "Correct!"){
            gradeEl.textContent = "";
        }else {
            gradeEl.textContent = "";
        }
    }, 2000);

    // increment index for new question
    index++;

    // If the index value is equal to the length of the question array, then the quiz is finished. Otherwise, showQuestions is called and a new question appears
    if (index === questionArray.length) {
        quizFinish();
        gradeEl.textContent == "";
        Win = true;
    }else {
        showQuestions();
    }

}

// displays final score, gathers user initials and stores them, and displays the highscore HTML page when the submit button is clicked
function quizFinish() {
    // Clear content and timer
    contentEl.innerHTML = "";
    timerEl.innerHTML = "";

    // Create new h1 tag with class
    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "all-done");

    // Create new div with class
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "final-score");

    // Add H1 text
    newH1.textContent = "All Done!";
    // Add div text
    newDiv.textContent = "Your final score is " + score + ".";

    // Append newH1 and newDiv to main/content
    contentEl.appendChild(newH1);
    contentEl.appendChild(newDiv);

    // new label for enter initials
    var getInitials = document.createElement("label");
    getInitials.setAttribute("type", "text");
    getInitials.setAttribute("id", "initals-label");
    getInitials.textContent = "Enter your initials: ";

    // User input for initals
    var userInput = document.createElement("input");
    userInput.setAttribute("type", "text");
    userInput.setAttribute("id", "initials-input");
    userInput.textContent = "";

    // create submit button
    var userSubmit = document.createElement("button");
    userSubmit.setAttribute("type", "submit");
    userSubmit.setAttribute("id", "initials-submit");
    userSubmit.textContent = "Submit";

    // Append initials label, input, and submit button to main/content
    contentEl.appendChild(getInitials);
    contentEl.appendChild(userInput);
    contentEl.appendChild(userSubmit);

    // event listener once user submits and initials and score is stored
    userSubmit.addEventListener("click", function(event) {
        event.preventDefault();

        // Checks valid user input
        if (userInput.value === "") {
            displayMessage("Error", "Initials cannot be blank");
        }else {
            var initials = userInput.value;

            var userInfo = {
                initials: initials,
                score: score,
            };

            localStorage.setItem("highscores", JSON.stringify(userInfo));

            // window.location.href=
        }

    });
}

// Attaches event listener to the start button to call the startQuiz function
startButton.addEventListener("click", startQuiz);