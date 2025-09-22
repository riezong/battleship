import Ship from '../battleship';
import Gameboard from '../gameboard';
import Player from '../player';
import domManager from './dom-manager';

const Game = function () {
	const human = new Player('Human');
	const cpu = new Player('CPU');

	let currentPlayer = human;

	const init = (function () {
		human.gameboard.placeShip(2, 5, 9);
		cpu.gameboard.placeShip(5, 3, 4);

		human.gameboard.receiveAttack(5, 9);
		cpu.gameboard.receiveAttack(4, 5);

		console.log(human.gameboard.grid);
		console.log(cpu.gameboard.grid);

		domManager.renderBoard(human, 'human-board');
		domManager.renderBoard(cpu, 'cpu-board');

		// Add Event Listeners to init
		domManager.addAttackListeners('cpu-board', (x, y) => {
			playRound(parseInt(x), parseInt(y));
		});

		// domManager.addAttackListeners('human-board', (x, y) => {
		// 	console.log(`Coordinates ${x}, ${y} on human board`);
		// });
	})();

	const switchPlayer = function () {
		currentPlayer = currentPlayer === human ? cpu : human;
	};

	const checkGameOver = function (player1, player2) {
		if (player1.gameboard.allShipsSunk() || player2.gameboard.allShipsSunk()) {
			console.log(`${currentPlayer.name} wins!`);
			return;
		}
	};

	const humanPlayerMove = function (x, y) {
		cpu.gameboard.receiveAttack(x, y);
		domManager.renderBoard(cpu, 'cpu-board');

		switchPlayer();
	};

	const cpuPlayerMove = function () {
		let randomMoveX = Math.floor(Math.random() * human.gameboard.gridSize);
		let randomMoveY = Math.floor(Math.random() * human.gameboard.gridSize);
		human.gameboard.receiveAttack(randomMoveX, randomMoveY);
		domManager.renderBoard(human, 'human-board');
	};

	const playRound = function (x, y) {
		console.log(currentPlayer);
		if (currentPlayer === human) {
			cpu.gameboard.receiveAttack(x, y);
			domManager.renderBoard(cpu, 'cpu-board');
			checkGameOver(human, cpu);
			switchPlayer();
		}
		setTimeout(() => {
			cpuPlayerMove();
		}, 500);
		checkGameOver(human, cpu);
		switchPlayer();
	};

	// playRound();
};

Game();
