import Ship from './battleship.js';

class Gameboard {
	constructor(gridSize) {
		this.gridSize = gridSize;
		this.grid = [];
		this.ships = [];
		this.missedAttacks = [];
		for (let x = 0; x < this.gridSize; x++) {
			this.grid[x] = [];
			for (let y = 0; y < this.gridSize; y++) {
				this.grid[x][y] = null;
			}
		}
	}

	placeShip(length, row, column) {
		if (
			column + length > this.gridSize ||
			column < 0 ||
			row < 0 ||
			row >= this.gridSize
		) {
			console.error(
				`Cannot place ship: Out of bounds at [${row}, ${column}] for length ${length}.`
			);
			return null;
		}

		for (let i = 0; i < length; i++) {
			if (this.grid[row][column + i] !== null) {
				console.error(
					`Cannot place ship: Cells are already occupied at [${
						row + i
					}, ${column}].`
				);
				return null;
			}
		}

		const newShip = new Ship(length);
		this.ships.push(newShip);

		for (let i = 0; i < length; i++) {
			this.grid[row][column + i] = newShip;
		}

		return newShip;
	}

	receiveAttack(row, column) {
		if (
			row < 0 ||
			row >= this.gridSize ||
			column < 0 ||
			column >= this.gridSize
		) {
			console.error(`Attack out of bounds: [${row}, ${column}].`);
			return null;
		}

		const targetCell = this.grid[row][column];

		if (targetCell === 'hit' || targetCell === 'miss') {
			console.warn(`Coordinate [${row}, ${column}] has already been attacked.`);
			return null;
		}

		if (targetCell !== null) {
			const hitShip = targetCell;
			hitShip.hit();
			this.grid[row][column] = 'hit';
			console.log('Target ship hit!');
			return true;
		} else {
			this.grid[row][column] = 'miss';
			this.missedAttacks.push([row, column]);
			console.log('Missed!');
			return false;
		}
	}

	allShipsSunk() {
		return this.ships.every((ship) => ship.isSunk());
	}
}

// module.exports = Gameboard;

export default Gameboard;
