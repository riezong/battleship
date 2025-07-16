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

describe('Gameboard receiveAttack method', () => {
	let board;
	let patrolBoat; // length 2
	let battleship; // length 4

	// beforeEach runs before *each* test in this describe block
	beforeEach(() => {
		board = new Gameboard(10);
		// Place some ships for consistent testing
		patrolBoat = board.placeShip(2, 0, 0); // Placed horizontally at (0,0) and (0,1)
		battleship = board.placeShip(4, 5, 5); // Placed horizontally at (5,5), (5,6), (5,7), (5,8)
	});

	// Test 1: Successful hit on a ship
	test('should correctly hit a ship and return true', () => {
		expect(board.receiveAttack(0, 0)).toBe(true); // Attack patrolBoat at its first segment
		expect(patrolBoat.noTimesHit).toBe(1); // Check ship's hit count
		expect(board.grid[0][0]).toBe('hit'); // Check grid marker
		expect(board.missedAttacks.length).toBe(0); // Ensure no missed attacks recorded
	});

	// Test 2: Successful hit on another segment of the same ship
	test('should hit another segment of the same ship', () => {
		board.receiveAttack(0, 0); // First hit
		expect(board.receiveAttack(0, 1)).toBe(true); // Attack patrolBoat at its second segment
		expect(patrolBoat.noTimesHit).toBe(2); // Patrol boat should now be hit twice
		expect(board.grid[0][1]).toBe('hit'); // Check grid marker
	});

	// Test 3: Ship sinks after enough hits
	test('should sink a ship after enough hits', () => {
		board.receiveAttack(0, 0); // Hit 1
		board.receiveAttack(0, 1); // Hit 2
		expect(patrolBoat.isSunk()).toBe(true); // Patrol boat should now be sunk
	});

	// Test 4: Missed attack
	test('should record a missed attack and return false', () => {
		expect(board.receiveAttack(9, 9)).toBe(false); // Attack empty water
		expect(board.missedAttacks.length).toBe(1);
		// Check if the missed coordinates are correctly stored
		expect(board.missedAttacks).toEqual([[9, 9]]);
		expect(board.grid[9][9]).toBe('miss'); // Check grid marker
	});

	// Test 5: Attacking an already hit spot (on a ship)
	test('should return null if an already hit ship coordinate is attacked', () => {
		board.receiveAttack(5, 5); // First hit on battleship
		expect(battleship.noTimesHit).toBe(1);

		const result = board.receiveAttack(5, 5); // Attack same spot again
		expect(result).toBeNull(); // Should be null because it's a duplicate attack
		expect(battleship.noTimesHit).toBe(1); // Hit count should NOT increase again
		expect(board.grid[5][5]).toBe('hit'); // Still marked as hit
		expect(board.missedAttacks.length).toBe(0); // No new missed attack
	});

	// Test 6: Attacking an already missed spot
	test('should return null if an already missed coordinate is attacked', () => {
		board.receiveAttack(9, 9); // First miss
		expect(board.missedAttacks).toEqual([[9, 9]]);
		expect(board.grid[9][9]).toBe('miss');

		const result = board.receiveAttack(9, 9); // Attack same spot again
		expect(result).toBeNull(); // Should be null because it's a duplicate attack
		expect(board.missedAttacks).toEqual([[9, 9]]); // Missed attacks should not change
		expect(board.grid[9][9]).toBe('miss'); // Still marked as miss
	});

	// Test 7: Attacking out of bounds (negative coordinates)
	test('should return null for out of bounds attack (negative x)', () => {
		const result = board.receiveAttack(-1, 0);
		expect(result).toBeNull();
		expect(board.missedAttacks.length).toBe(0); // No changes
	});

	// Test 8: Attacking out of bounds (exceeding grid size)
	test('should return null for out of bounds attack (too high y)', () => {
		const result = board.receiveAttack(0, 10); // 10x10 board, so 10 is out of bounds
		expect(result).toBeNull();
		expect(board.missedAttacks.length).toBe(0); // No changes
	});
});
