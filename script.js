'use strict';

const questions = [
  {
    topic: 'History',
    question: 'Which civilization built the pyramids of Giza?',
    possibleAnswers: ['Nigerian', 'Egyptian', , 'Roman'],
    correctAnswer: 'Egyptian',
  },
  {
    topic: 'Literature',
    question: "Who wrote 'Romeo and Juliet'?",
    possibleAnswers: [
      'Charles Dickens',
      'Yusuf Oyinlola',
      'William Shakespeare',
      'Jane Austen',
    ],
    correctAnswer: 'William Shakespeare',
  },
  {
    topic: 'Geography',
    question: 'What is the capital of Japan?',
    possibleAnswers: ['Beijing', 'Ilorin', 'Tokyo'],
    correctAnswer: 'Tokyo',
  },
  {
    topic: 'Math',
    question: 'What is (√8)^2',
    possibleAnswers: ['4', '8', '2', '16'],
    correctAnswer: '8',
  },
  {
    topic: 'Football',
    question: 'Which is the biggest club in London?',
    possibleAnswers: ['Arsenal', 'Chelsea', 'Tottenham'],
    correctAnswer: 'Arsenal',
  },
];

const quizProgressContainer = document.querySelector('.quiz-progress');
const questionContainer = document.querySelector('.question-container');
const answerContainer = document.querySelector('.answer-container');

// Create and display the progress bars
questions.forEach(question => {
  const span = document.createElement('span');
  quizProgressContainer.append(span);
});

let currentQuestionIndex = 0;
let currentScore = 0;

function showQuestion(index) {
  // Retreives and display the current topic and question
  const topicParagraphEl = document.createElement('p');
  topicParagraphEl.textContent = questions[index].topic;

  const questionParagraphEl = document.createElement('p');
  questionParagraphEl.textContent = questions[index].question;

  questionContainer.append(topicParagraphEl, questionParagraphEl);

  // Retreives and Display the possible answers
  let possibleAnswerIndex = 0;

  questions[index].possibleAnswers.forEach(possibleAnswer => {
    const button = document.createElement('button');
    button.textContent = possibleAnswer;

    answerContainer.append(button);

    possibleAnswerIndex++;

    // Listens for when a user clicks an answer buttton, and proceding to the next question
    button.addEventListener('click', () => {
      // Compares the text content of the button clicked to the correct answer
      if (button.textContent === questions[index].correctAnswer) currentScore++;

      // Tracks the quiz progress
      const spans = document.querySelectorAll('.quiz-progress span');
      spans[currentQuestionIndex].classList.add('seen');

      // Prepares to move to the next question or finish the quiz
      currentQuestionIndex++;

      // If not done with the available questions, delays a bit, then display the next question
      if (currentQuestionIndex < questions.length) {
        setTimeout(() => {
          // Clears the previous question and its possible answers
          clearContainers();

          showQuestion(currentQuestionIndex);
        }, 100);

        // Display current score when done with all the available questions
      } else {
        topicParagraphEl.textContent = 'Score';
        questionParagraphEl.textContent = `You scored ${currentScore}/${questions.length}`;

        answerContainer.innerHTML = '';

        // Create and display a restart button
        const restartBtn = document.createElement('button');
        restartBtn.textContent = 'Restart';
        restartBtn.classList.add('restart-button');
        answerContainer.append(restartBtn);

        // Restarts the quiz when the restart button is clicked
        restartBtn.addEventListener('click', () => {
          setTimeout(() => {
            currentQuestionIndex = 0;
            currentScore = 0;

            clearContainers();

            spans.forEach(span => span.classList.remove('seen'));

            showQuestion(currentQuestionIndex);
          }, 500);
        });
      }
    });
  });
}

function clearContainers() {
  questionContainer.innerHTML = '';
  answerContainer.innerHTML = '';
}

showQuestion(currentQuestionIndex);
