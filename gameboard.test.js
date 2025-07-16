const Gameboard = require('./gameboard');
import Ship from './battleship';

test('Gameboard Constructor Initialization', () => {
	const board1 = new Gameboard(5);
	expect(board1.gridSize).toBe(5);
	expect(board1.grid.length).toBe(5);
	expect(board1.grid[0].length).toBe(5);
	expect(board1.grid[2][2]).toBe(null);
	expect(board1.ships.length).toBe(0);
	expect(board1.missedAttacks.length).toBe(0);
});

test('placeShip - Valid Placement (Horizontal)', () => {
	const board2 = new Gameboard(10);
	const shipA = board2.placeShip(3, 0, 0);
	expect(shipA instanceof Ship).toBe(true);
	expect(board2.ships.length).toBe(1);
	expect(board2.ships[0]).toBe(shipA);
	expect(board2.grid[0][0]).toBe(shipA);
	expect(board2.grid[0][1]).toBe(shipA);
	expect(board2.grid[0][2]).toBe(shipA);
	expect(board2.grid[0][3]).toBe(null);
});

test('placeShip - Another Valid Placement (Horizontal, different spot)', () => {
	const board2 = new Gameboard(10);
	const shipA = board2.placeShip(3, 0, 0);
	const shipB = board2.placeShip(2, 5, 5);
	expect(shipB instanceof Ship).toBe(true);
	expect(board2.ships.length).toBe(2);
	expect(board2.grid[5][5]).toBe(shipB);
	expect(board2.grid[5][6]).toBe(shipB);
	expect(board2.grid[5][4]).toBe(null);
});

test('placeShip - Placement Out of Bounds (Starts off board)', () => {
	const board3 = new Gameboard(5);
	const shipC = board3.placeShip(3, -1, 0);
	expect(shipC).toBe(null);
	expect(board3.ships.length).toBe(0);
	expect(board3.grid[0][0]).toBe(null);
});

test('placeShip - Placement Out of Bounds (Goes off board horizontally)', () => {
	const board3 = new Gameboard(5);
	const shipD = board3.placeShip(3, 0, 3);
	expect(shipD).toBe(null);
	expect(board3.ships.length).toBe(0);
	expect(board3.grid[3][0]).toBe(null);
});

test('placeShip - Placement Out of Bounds (x-coordinate)', () => {
	const board3 = new Gameboard(5);
	const shipE = board3.placeShip(2, 5, 0);
	expect(shipE).toBe(null);
	expect(board3.ships.length).toBe(0);
	expect(board3.grid[0][0]).toBe(null);
});

test('placeShip - Overlapping Placement', () => {
	const board4 = new Gameboard(5);
	board4.placeShip(2, 1, 1);
	const shipF = board4.placeShip(3, 0, 1);
	expect(shipF).toBe(null);
	expect(board4.ships.length).toBe(1);
	expect(board4.grid[1][1] instanceof Ship).toBe(true);
	expect(board4.grid[0][1]).toBe(null);
});
