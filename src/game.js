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

		// Add Event Listeners
		domManager.addAttackListeners('cpu-board', (x, y) => {
			playRound(parseInt(x), parseInt(y));
		});
	})();

	const switchPlayer = function () {
		currentPlayer = currentPlayer === human ? cpu : human;
	};

	const checkGameOver = function (targetPlayer) {
		if (targetPlayer.gameboard.allShipsSunk()) {
			console.log(`${currentPlayer.name} wins!`);
			domManager.renderGameOverScreen(currentPlayer.name);
			return true;
		} else {
			return false;
		}
	};

	const cpuPlayerMove = function () {
		let x, y;
		let isValidAttack = false;

		// Loop until legal move
		while (!isValidAttack) {
			x = Math.floor(Math.random() * human.gameboard.gridSize);
			y = Math.floor(Math.random() * human.gameboard.gridSize);
			// Check for illegal move
			if (
				human.gameboard.grid[y][x] !== 'hit' &&
				human.gameboard.grid[y][x] !== 'miss'
			) {
				isValidAttack = true;
			}
		}

		playRound(x, y);
		domManager.renderBoard(human, 'human-board');
	};

	const playRound = function (x, y) {
		let targetPlayer;
		if (currentPlayer === human) {
			targetPlayer = cpu;
		} else {
			targetPlayer = human;
		}

		const attackResult = targetPlayer.gameboard.receiveAttack(x, y);
		console.log(
			`${currentPlayer.name} attacks ${targetPlayer.name} at [${x}, ${y}]. Result: ${attackResult}`
		);
		domManager.renderBoard(cpu, 'cpu-board');

		switchPlayer();

		if (checkGameOver(targetPlayer)) {
			console.log(`${currentPlayer.name} wins!`);
			return;
		}

		if (currentPlayer === cpu) {
			cpuPlayerMove();
		}
	};
};

Game();
