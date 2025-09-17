import Ship from '../battleship';
import Gameboard from '../gameboard';
import Player from '../player';
import domManager from './dom-manager';

const Game = function () {
	const human = new Player('Human');
	const cpu = new Player('CPU');

	human.gameboard.placeShip(2, 5, 9);
	cpu.gameboard.placeShip(5, 3, 4);

	human.gameboard.receiveAttack(5, 9);
	cpu.gameboard.receiveAttack(4, 5);

	console.log(human.gameboard.grid);
	console.log(cpu.gameboard.grid);

	domManager.renderBoard(human, 'human-board');
	domManager.renderBoard(cpu, 'cpu-board');
};

Game();
