const Ship = require('./battleship');

test('Ship Initialization', () => {
	const ship1 = new Ship(3);
	expect(ship1.length).toBe(3);
	expect(ship1.noTimesHit).toBe(0);
	expect(ship1.isSunk()).toBe(false);
});

test('hit() method increments noTimesHit', () => {
	const ship2 = new Ship(2);
	ship2.hit();
	expect(ship2.noTimesHit).toBe(1);
	ship2.hit();
	expect(ship2.noTimesHit).toBe(2);
});

test('isSunk() returns false when not enough hits', () => {
	const ship3 = new Ship(4);
	ship3.hit();
	ship3.hit();
	expect(ship3.isSunk()).toBe(false);
});

test('isSunk() returns true when hits equal length', () => {
	const ship4 = new Ship(3);
	ship4.hit();
	ship4.hit();
	ship4.hit();
	expect(ship4.isSunk()).toBe(true);
});

test('isSunk() returns true when hits exceed length', () => {
	const ship5 = new Ship(1);
	ship5.hit();
	ship5.hit();
	expect(ship5.isSunk()).toBe(true);
});
