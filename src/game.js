import Ship from '../battleship';
import Gameboard from '../gameboard';
import Player from '../player';
import domManager from './dom-manager';

const Game = function () {
	const human = new Player('Human');
	const cpu = new Player('CPU');

	let currentPlayer = human;

	const shipLibrary = {
		carrier: 5,
		battleship: 4,
		cruiser: 3,
		submarine: 3,
		patrol: 2,
	};

	const randomPlaceShip = function (player) {
		// cpu.gameboard.placeShip(5, 3, 4);
		let x, y;

		Object.keys(shipLibrary).forEach((key) => {
			console.log(key, shipLibrary[key]);

			x = Math.floor(Math.random() * player.gameboard.gridSize);
			y = Math.floor(Math.random() * player.gameboard.gridSize);

			// Loop until legal placement
			// Since placeShip returns null for invalid placements, use that to check for illegal placement
			while (player.gameboard.placeShip(shipLibrary[key], x, y) === null) {
				x = Math.floor(Math.random() * player.gameboard.gridSize);
				y = Math.floor(Math.random() * player.gameboard.gridSize);
			}
			player.gameboard.placeShip(shipLibrary[key], x, y);
			console.log(`${player.name} places ${key} at ${x} ${y}`);
		});

		console.log(`${player.name}'s ship placement complete`);
	};

	const init = (function () {
		randomPlaceShip(human);
		randomPlaceShip(cpu);

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

		if (checkGameOver(targetPlayer)) {
			console.log(`${currentPlayer.name} wins!`);
			return;
		}

		switchPlayer();

		if (currentPlayer === cpu) {
			cpuPlayerMove();
		}
	};
};

Game();
