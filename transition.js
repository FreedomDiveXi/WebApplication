let questionList = [];
let correct = 0;
let totalTime;
let counter = 0;

function questionTemplate() {
	let template = document.getElementById('questionTemplate').innerHTML;
	return Handlebars.complile(template);
}

document.addEventListener('DOMContentLoaded', () => {
	getQuizzes();
	document.getElementById('begin').addEventListener('click', begin);
});

async function getQuizzes() {
	const fetching = await fetch('https://my-json-server.typicode.com/FreedomDiveXi/WebApplication/quizzes');
	const quizzes = await fetching.json();
	const selectElement = document.getElementById('quiz-select');

	quizzes.forEach(quiz => {
		const option = document.createElement('option');
		option.textContent = quiz.name;
		option.value = quiz.id;
		selectElement.appendChild(option);
	});
}

async function begin() {
	const person = document.getElementById('person-name');
	const quizId = document.getElementById('quiz-select').value;

	await getQuestions(quizId);
	document.getElementById('quiz-home').style.display = 'none';
	document.getElementById('eachQuestion').style.diplay = 'block';
	document.getElementById('questionExplaination').style.diplay = 'block';
	document.getElementById('information').style.diplay = 'block';
}

async function getQuestions(quizId) {
	const fetching = await fetch(`https://my-json-server.typicode.com/FreedomDiveXi/WebApplication/quizzes/${quizId}`);
	const tempQuestions = await fetching.json();

	questionList = tempQuestions.questions;
	correct = 0;
	counter = 0;
	questionTime(questionList[counter]);
}

function questionTime(question) {
	let tempQuestion = showQuestionTemplate(question);
	let plugInDiv = document.getElementById('eachQuestion');
	plugInDiv.innerHTML = tempQuestion;

	if (question.type === "narrative") {
		document.getElementById('user-narrative').addEventListener('click', () => {
			const userInput = document.getElementById('user-narrative').value;
			check(userInput);
		});
	}
}

function showQuestionTemplate(question) {
	let tempQuestion = `<div><h1>${question.question}</h2>`;

	switch (question.type){
		case 'multiple-choice':
			question.options.forEach((option, index) => {
				tempQuestion += `<button id="answer-choices"${option}</button>`;
			});
			tempQuestion += `</div>`;
		break;
		case 'narrative':
			tempQuestion += `<textarea id="user-narrative"></textarea><br/><button id="submit">Submit</button></div>`;
		break;
		case 'image':
			tempQuestion += `<div class="image-choices">`;
			question.options.forEach((option, index) => {
				tempQuestion += `<img src="${option}" class="image-choice" data-answer="${index}">`;
			});
			tempQuestion += `</div>`;
		break;
	}

	return tempQuestion
}
