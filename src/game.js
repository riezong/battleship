import Ship from '../battleship.js';
import Gameboard from '../gameboard.js';
import Player from '../player.js';
import domManager from './dom-manager.js';

const game = (function () {
	const player1 = new Player('Player 1');
	const player2 = new Player('Computer');

	let activePlayer = player1;

	const playerBoardElement = document.querySelector('#player-board');
	const computerBoardElement = document.querySelector('#computer-board');

	const init = function () {
		player1.gameboard.placeShip(4, 2, 6);
		player1.gameboard.placeShip(3, 3, 0);
		player1.gameboard.placeShip(2, 5, 4);
		player1.gameboard.placeShip(5, 7, 2);

		player2.gameboard.placeShip(4, 2, 6);
		player2.gameboard.placeShip(3, 3, 0);
		player2.gameboard.placeShip(2, 5, 4);
		player2.gameboard.placeShip(5, 7, 2);

		domManager.renderPlayerBoard(player1.gameboard, playerBoardElement, true);
		domManager.renderPlayerBoard(
			player2.gameboard,
			computerBoardElement,
			false
		);

		domManager.addAttackListeners(computerBoardElement, (row, column) => {
			playRound(parseInt(row, 10), parseInt(column, 10));
		});
	};

	const playRound = function (row, column) {
		let targetPlayer;
		if (activePlayer === player1) {
			targetPlayer = player2;
		} else {
			targetPlayer = player1;
		}

		const attackResult = targetPlayer.gameboard.receiveAttack(row, column);
		console.log(
			`${activePlayer.name} attacks ${targetPlayer.name} at [${row}, ${column}]. Result: ${attackResult}`
		);

		domManager.renderPlayerBoard(player1.gameboard, playerBoardElement, true);
		domManager.renderPlayerBoard(
			player2.gameboard,
			computerBoardElement,
			false
		);

		if (targetPlayer.gameboard.allShipsSunk()) {
			console.log(`${activePlayer.name} wins!`);
			return;
		}

		switchPlayer();

		if (activePlayer === player2) {
			setTimeout(() => {
				computerTurn();
			}, 500); // Adding a slight delay for a better user experience
		}
	};

	const switchPlayer = function () {
		activePlayer = activePlayer === player1 ? player2 : player1;
	};

	const computerTurn = function () {
		let x, y;
		let isValidAttack = false;

		while (!isValidAttack) {
			x = Math.floor(Math.random() * player1.gameboard.gridSize);
			y = Math.floor(Math.random() * player1.gameboard.gridSize);

			if (
				player1.gameboard.grid[x][y] !== 'hit' &&
				player1.gameboard.grid[x][y] !== 'miss'
			) {
				isValidAttack = true;
			}
		}

		playRound(x, y);
	};

	console.log(player1.gameboard.grid);
	console.log(player2.gameboard.grid);

	return { init, player1, player2 };
})();

game.init();

export default game;
