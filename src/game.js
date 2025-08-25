import Ship from '../battleship.js';
import Gameboard from '../gameboard.js';
import Player from '../player.js';
import domManager from '../dom-manager.js';

const init = function () {};

const game = (function () {
	const player1 = new Player('Player 1');

	player1.gameboard.placeShip(4, 2, 6);
	player1.gameboard.placeShip(3, 3, 0);
	player1.gameboard.placeShip(2, 5, 4);
	player1.gameboard.placeShip(5, 7, 2);

	const player2 = new Player('Computer');
	player2.gameboard.placeShip(4, 2, 6);
	player2.gameboard.placeShip(3, 3, 0);
	player2.gameboard.placeShip(2, 5, 4);
	player2.gameboard.placeShip(5, 7, 2);

	player1.gameboard.receiveAttack(2, 6);
	player1.gameboard.receiveAttack(2, 6);

	console.log(player1.gameboard.grid);
	console.log(player2.gameboard.grid);

	const playerBoardElement = document.querySelector('#player-board');
	const computerBoardElement = document.querySelector('#computer-board');

	domManager.renderPlayerBoard(player1.gameboard, playerBoardElement);
	domManager.renderPlayerBoard(player2.gameboard, computerBoardElement);

	return { player1, player2 };
})();

export default game;
