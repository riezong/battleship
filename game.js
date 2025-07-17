import Ship from './battleship.js';
import Gameboard from './gameboard.js';
import Player from './player.js';

const game = (function () {
	const player1 = new Player('Player 1');

	player1.gameboard.placeShip(4, 2, 6);
	player1.gameboard.placeShip(3, 3, 0);
	player1.gameboard.placeShip(2, 5, 4);
	player1.gameboard.placeShip(5, 7, 2);

	const player2 = new Player('Player 2');
	player2.gameboard.placeShip(4, 2, 6);
	player2.gameboard.placeShip(3, 3, 0);
	player2.gameboard.placeShip(2, 5, 4);
	player2.gameboard.placeShip(5, 7, 2);

	console.log(player1.gameboard.grid);
	console.log(player2.gameboard.grid);

	return { player1, player2 };
})();

export default game;
