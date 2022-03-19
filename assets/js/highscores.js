// Selects content by class
var contentEl = document.querySelector(".content");
// Selects go back button by class
var backButton = document.querySelector(".back-button");
// Selects clear button by class
var clearButton = document.querySelector(".clear-button");
// Selects unordered list by id
var listScores = document.querySelector("#list-scores");

// when the go back button is clicked the page will change to the index.html containing the quiz
backButton.addEventListener("click", function() {

    window.location.replace=("https://cdfoye.github.io/Coding-Quiz/");

});

// when the clear button is clicked then the local storage is cleared and the page is reloaded
clearButton.addEventListener("click", function() {
    localStorage.clear();
    location.reload();
});

// Update highScores by getting new highScores from localStorage
var highScores = localStorage.getItem("highScores");
// Parse a string (written in JSON format), in this case previous highScores, and return a JavaScript object equal to current highScores
highScores = JSON.parse(highScores);

// conditional checks the highScores has a value
if (highScores !=null) {
    // for loop that iterates once until it reaches the length of highScores
    for (var i = 0; i < highScores.length; i++) {
        // Create a new list item and set to equal new variable newList
        var newList = document.createElement("li");
        // add an id of ranks to the list item
        newList.setAttribute("id", "ranks")
        // Update the text of the list item to display the initials of players along with their scores
        newList.textContent = (i + 1) + ". " + highScores[i].initials + " - " + highScores[i].score;
        // append newList to the listScores unordered list
        listScores.appendChild(newList);

    }
}