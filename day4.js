// Declare DOM elements for quiz
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");

// Initialize variables
let currentQuestionIndex = 0;
let score = 0;

// Questions Array
const questions = [
    { question: "What is my favorite color?", options: ["Pink", "Cyan", "Lavender"], correct: 1 },
    { question: "What is my favorite bird?", options: ["Flamingo", "Penguin", "Hawk"], correct: 1 },
    { question: "What is my favorite food?", options: ["Pizza", "Burger", "Pasta"], correct: 0 },
    { question: "What was my childhood nickname?", options: ["Silky", "Milky", "BooBoo"], correct: 0 },
    { question: "What is my dream destination to visit?", options: ["New York", "London", "Tokyo"], correct: 0 },
    { question: "Which hobby do I enjoy most?", options: ["Painting", "Crochetting", "Dancing"], correct: 2 },
    { question: "What was my favorite subject in school?", options: ["Physics", "Chemistry", "Math"], correct: 2 },
    { question: "What was my favorite toy as a child?", options: ["Beyblades", "NerfGun", "Legos"], correct: 0 },
    { question: "What is my favorite stuffed toy?", options: ["Unicorni", "Penguini", "Dinoo"], correct: 1 },
    { question: "What was i trying to cook when i burned down the kitchen?", options: ["Icecream", "Brownies", "Cake"], correct: 0 },
    { question: "What is my worst haircut phase?", options: ["Bangs", "undercut", "Slantcut"], correct: 2 },
    { question: "Which is my least favourate chore?", options: ["Dishes", "Mopping", "Sweeping"], correct: 0 },
    { question: "What is the first video game i played?", options: ["Val", "COD", "Spiderman"], correct: 1 },
    { question: "Lets see how much you scored hehe", options: ['Go On']},

];

// Load a question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = ""; // Clear previous options

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "cute-button";
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}

// Check the answer
function checkAnswer(selectedIndex) {
    if (selectedIndex === questions[currentQuestionIndex].correct) {
        score++;
    }
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showEndQuizButton();
    }
}

// Show "End Quiz" button
function showEndQuizButton() {
    optionsContainer.innerHTML = ""; // Clear options
    const endQuizButton = document.createElement("button");
    endQuizButton.textContent = "End Quiz";
    endQuizButton.className = "cute-button";
    endQuizButton.onclick = endQuiz;
    optionsContainer.appendChild(endQuizButton);
}

function endQuiz() {
    optionsContainer.innerHTML = ""; // Clear options

    // Display the final score
    questionText.textContent = `Quiz ended! Your score is: ${score}`;

    // Determine which button to show based on score range
    if (score >= 1 && score <= 4) {
        createResultButton("Button 1", handleButton1);
    } else if (score >= 5 && score <= 8) {
        createResultButton("Button 2", handleButton2);
    } else if (score >= 9 && score <= 19) {
        createResultButton("Button 3", handleButton3);
    } else {
        questionText.textContent = "No valid score range!";
    }
}


// Create result button dynamically
function createResultButton(text, handler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = "cute-button";
    button.onclick = handler;
    optionsContainer.appendChild(button);
    console.log(`${text} added`); // Debugging
}

// Handlers for result buttons
function handleButton1() {
    questionText.textContent = "You chose Button 1. Try to score higher next time!";
    optionsContainer.innerHTML = ""; // Clear options
}

function handleButton2() {
    questionText.textContent = "You chose Button 2. Great job!";
    optionsContainer.innerHTML = ""; // Clear options
}

function handleButton3() {
    questionText.textContent = "You chose Button 3. You're amazing!";
    optionsContainer.innerHTML = ""; // Clear options
}// Create result button dynamically
function createResultButton(text, handler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.className = "cute-button";
    button.onclick = handler;
    optionsContainer.appendChild(button);
    console.log(`${text} added`); // Debugging
}

function handleButton1() {
    window.location.href = "turtle1.html"; // Replace with the actual path to the target HTML page for Button 1
}

function handleButton2() {
    window.location.href = "turtle2.html"; // Replace with the actual path to the target HTML page for Button 2
}

function handleButton3() {
    window.location.href = "turtle3.html"; // Replace with the actual path to the target HTML page for Button 3
}

// Start quiz
loadQuestion();
