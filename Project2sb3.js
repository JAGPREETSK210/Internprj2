let allQuestions = [
    {
        text: "Grand Central Terminal, Park Avenue, New York is the world's",
        image: "Newyork.jpg", 
        correctAnswer: "A",
        options: ["A. largest railway station", "B. highest railway station", "C. longest railway station", "D. None of the above"],
        explanation: "Grand Central Terminal, Park Avenue, New York is the world's largest railway station."
    },
    {
        text: "Entomology is the science that studies",
        image: "", 
        correctAnswer: "B",
        options: ["A. Behavior of human beings", "B. Insects", "C. The origin and history of technical and scientific terms", "D. The formation of rocks"],
        explanation: "Entomology is the science that studies insects."
    },
    {
        text: "Garampani sanctuary is located at",
        image: "Sanctuary.jpg", 
        correctAnswer: "B",
        options: ["A. Junagarh, Gujarat", "B. Diphu, Assam", "C. Kohima, Nagaland", "D. Gangtok, Sikkim"],
        explanation: "Garampani sanctuary is located at Diphu, Assam."
    },
    {
        text: "Hitler party which came into power in 1933 is known as",
        image: "", 
        correctAnswer: "B",
        options: ["A. Labour Party", "B. Nazi Party", "C. Ku-Klux-Klan", "D. Democratic Party"],
        explanation: "The Hitler party which came into power in 1933 is known as the Nazi Party."
    },
    {
        text: "FFC stands for",
        image: "", 
        correctAnswer: "B",
        options: ["A. Foreign Finance Corporation", "B. Film Finance Corporation", "C. Federation of Football Council", "D. None of the above"],
        explanation: "FFC stands for Film Finance Corporation."
    },
    {
        text: "Fastest shorthand writer was",
        image: "writer.jpg", 
        correctAnswer: "A",
        options: ["A. Dr. G. D. Bist", "B. J.R.D. Tata", "C. J.M. Tagore", "D. Khudada Khan"],
        explanation: "The fastest shorthand writer was Dr. G. D. Bist."
    },
    {
        text: "Epsom (England) is the place associated with",
        image: "England.jpg", 
        correctAnswer: "A",
        options: ["A. Horse racing", "B. Polo", "C. Shooting", "D. Snooker"],
        explanation: "Epsom (England) is associated with horse racing."
    },
    {
        text: "Golf player Vijay Singh belongs to which country?",
        image: "Golf.jpg", 
        correctAnswer: "B",
        options: ["A. USA", "B. Fiji", "C. India", "D. UK"],
        explanation: "Golf player Vijay Singh belongs to Fiji."
    },
    {
        text: "First China War was fought between",
        image: "Chinawar.jpg" ,
        correctAnswer: "A",
        options: ["A. China and Britain", "B. China and France", "C. China and Egypt", "D. China and Greek"],
        explanation: "The First China War was fought between China and Britain."
    }
];

let selectedQuestions = [];
let currentQuestionIndex = 0;
let timeLeft = 10;
let timerId;
let score = 0;


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function selectRandomQuestions() {
    selectedQuestions = shuffle(allQuestions).slice(0, 5);
}

function startTimer() {
    timeLeft = 10;
    document.getElementById('timer').innerText = timeLeft;

    timerId = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerId);
            alert("Time's up!");
            nextQuestion();
        }
    }, 1000);
}

function nextQuestion() {
    clearInterval(timerId);
    document.getElementById('explanation').style.display = 'none';
    currentQuestionIndex++;
    
    if (currentQuestionIndex < selectedQuestions.length) {
        loadQuestion(currentQuestionIndex);
        startTimer();
    } else {
        showScore();
    }
}

function loadQuestion(index) {
    document.getElementById('question-text').innerText = selectedQuestions[index].text;
    document.getElementById('question-image').src = selectedQuestions[index].image;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    selectedQuestions[index].options.forEach(option => {
        const label = document.createElement('label');
        label.className = 'option';
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = option.charAt(0); 
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        optionsContainer.appendChild(label);
    });

    document.getElementById('submit-button').style.display = 'block';
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    const explanationContainer = document.getElementById('explanation');

    if (selectedOption) {
        const answer = selectedOption.value;
        const correctAnswer = selectedQuestions[currentQuestionIndex].correctAnswer;
        explanationContainer.innerText = selectedQuestions[currentQuestionIndex].explanation;
        explanationContainer.style.display = 'block';

        const options = document.querySelectorAll('.option');

        options.forEach(option => {
            if (option.querySelector('input').value === correctAnswer) {
                option.style.backgroundColor = 'lightgreen';
            } else if (option.querySelector('input').checked) {
                option.style.backgroundColor = 'lightcoral';
            }
        });

        if (answer === correctAnswer) {
            score++;
        }

        document.getElementById('submit-button').style.display = 'none';
        setTimeout(nextQuestion, 3000); 
    } else {
        alert("Please select an answer before submitting.");
    }
}

function showScore() {
    document.querySelector('.container').innerHTML = `<div id="score">Your score is: ${score}</div>`;
}

window.onload = () => {
    selectRandomQuestions();
    loadQuestion(currentQuestionIndex);
    startTimer();
};
