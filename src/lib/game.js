import readline from 'readline';
import chalk from 'chalk';

// trivia questions
//has an array of question objects
//each object has:
//question: the text question
//choices: possible answers
//answer: expected output
//explanation: will be shown if the expected output is not correct
const questions = [
    {
        question: "What does 'www' stand for in a website address?",
        choices: ["A. World Web Wide", "B. Wide Website World", "C. World Wide Web"],
        answer: "C",
        explanation: "www stands for World Wide Web."
    },
    {
        question: "What is the shortcut for pasting information in a computer?",
        choices: ["A. Ctrl+V", "B. Ctrl+C", "C. Ctrl+P"],
        answer: "A",
        explanation: "The choice of V for pasting (coupled with C for copy and X for cut) was designed for efficiency and ergonomics on standard QWERTY keyboards."
    },
    {
        question: "Which company developed the Android system?",
        choices: ["A. Kenya", "B. Google", "C. Android"],
        answer: "B",
        explanation: "Google developed Android system."
    },
    {
        question: "What does 'HTML' stand for?",
        choices: ["A. HyperText Markup Language", "B. Home Tool Markup Language", "C. Hyper Tool Marking Language"],
        answer: "A",
        explanation: `HTML stands for HyperText Markup Language, which is used to annotate (or "mark up") text and images, allowing a web browser to structure content and create clickable links ("hypertext") that connect different documents across the web.`
    },
    {
        question: "Which tag is used for the largest heading?",
        choices: ["A. <p>", "B. <h1>", "C. <head>"],
        answer: "B",
        explanation: "HTML headings follow a hierarchy from <h1> (largest/most important) down to <h6> (smallest/least important), making <h1> the tag for the main, largest heading."
    },
    {
        question: "What CSS property controls the bolding of text?",
        choices: ["A. font-weight", "B. font-size", "C. font-style"],
        answer: "A",
        explanation: "The font-weight property is specifically designed to set the thickness or weight of characters in text."
    }
]
//Defining the variables
let score = 0; //tracks score
let index = 0; //tracks current question
let timeLeft = 600; //total game time in seconds (10 minutes)
let timer;

// Start the game - handles user selection
export function startGame() {
    console.log("\n=== Trivia Game ==="); 
    console.log("1. Start the game");
    console.log("2. Quit");

    rl.question("\nSelect an option (1 or 2): ", (input) => {
        const choice = input.trim();

        if (choice === "1") {
            console.log("\nStarting game...\n"); //selecting 1, proceed to the questions in the game

            score = 0;
            index = 0;
            timeLeft = 600;

            startTimer();
            showQuestion();

        } else if (choice === "2") { //selecting a 2 means quitting
            console.log("Goodbye!");
            rl.close();

        } else {
            console.log("Invalid option. Please choose 1 or 2."); //select a correct option
            startGame();
        }
    });
}

//Timer
function startTimer() {
    timer = setInterval(() => { //setting the timer
        timeLeft--; //time decreases by 1
        if (timeLeft <= 0) {
            //stop the interval if time left is 0
            console.log(chalk.red("\nTime is up!"));
            endGame();
        }
    }, 1000); //runs the function every 1000 milliseconds
}
//Readline interface- handles user input/output in the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//List the questions sequentially 
//Displays questions and all the choices
//Moves to end game if there are no more questions
function showQuestion() {
    if (index >= questions.length) {
        return endGame();
    }
    const q = questions[index];
    console.log(chalk.blue(`\nQuestion ${index + 1}: ${q.question}`)); //question
    q.choices.map(choice => console.log(choice)); //choices
    rl.question("\nEnter your answer (A/B/C): ", (answer) => { //user input
        checkAnswer(answer);
    });
}
//Check if answer is correct
//if answer is correct score increases
//if answer is wrong, it shows the correct answer and explanation (logic behind the answer)
function checkAnswer(answer) {
    const q = questions[index];

    if (answer.toUpperCase() === q.answer) { //if answer is in lowercase, converts to Uppercase and validates if correct
        console.log(chalk.green("Correct!\n"));
        score++;
    } else {
        console.log(chalk.red(`Incorrect! The correct answer is ${q.answer}. ${q.explanation}\n`));
    }
    index++;
    showQuestion();
}
//End Game
async function endGame() {
    clearInterval(timer); //stops timer
    console.log(chalk.magenta("Game is Over!"));
    console.log(chalk.magenta(`Your score is: ${score}/${questions.length}`)); //Displays final score
    rl.close(); //closes the readline interface
}