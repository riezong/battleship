const Player = require('./player');
import Gameboard from './gameboard';

test("should correctly set the player's name", () => {
	const player1 = new Player('Human Player');
	expect(player1.name).toBe('Human Player');

	const computerPlayer = new Player('Computer AI');
	expect(computerPlayer.name).toBe('Computer AI');
});

test('should create a new Gameboard instance for the player', () => {
	const player = new Player('Test Player');
	expect(player.gameboard).toBeDefined();
	expect(player.gameboard).toBeInstanceOf(Gameboard);
	expect(player.gameboard.gridSize).toBe(10);

	const player2 = new Player('Another Player');
	expect(player.gameboard).not.toBe(player2.gameboard);
});
