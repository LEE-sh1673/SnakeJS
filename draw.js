const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const scale = 10; // scale for snake

const rows = canvas.height / scale;
const columns = canvas.width / scale;

// score element
const score = document.getElementById("jsScore");
const padKeys = document.getElementsByClassName("controller__btn");

let snake;
let offsetX;
let offsetY;
let currentScore;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetWidth;
offsetX = (window.innerWidth - canvas.offsetWidth) / 2;
offsetY = canvas.offsetTop;
currentScore = 0;


// Immediate Function: 함수를 정의함과 동시에 실행하는 함수
/*
즉시실행함수의 경우 함수를 정의하자마 실행되기 때문에, 같은 함수를 다시 호출할 수 없다. 이러한 특성을 이용해 최초에 한 번만 실행되는 초기화 코드에서 사용할 수 있다.
*/

(function setUp() {
	snake = new Snake();
	fruit = new Fruit();

	fruit.pickLocation();

	window.setInterval(() => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		fruit.draw();
		snake.update();
		snake.draw();

		if (snake.eat(fruit)) {
			fruit.pickLocation();
			currentScore++;
		}
		snake.checkCollision();

		score.innerText = currentScore;
	}, 150);
}());

function handleResizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  offsetX = (window.innerWidth - canvas.offsetWidth) / 2;
  offsetY = canvas.offsetTop;
}

function handleKeyboardInput(event) {
	const direction = event.key.replace('Arrow', '');
	snake.changeDirection(direction);
}

function handlePadInput(event) {
	const direction = event.target.attributes[1].value;
	snake.changeDirection(direction);
}

window.addEventListener("resize", handleResizeCanvas);
window.addEventListener("keydown", handleKeyboardInput);


Array.from(padKeys).forEach((padKey) => {
	padKey.addEventListener("click", handlePadInput);
});