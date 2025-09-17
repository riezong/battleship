import Ship from './battleship.js';

class Gameboard {
	constructor(gridSize) {
		this.gridSize = gridSize;
		this.grid = [];
		for (let x = 0; x < this.gridSize; x++) {
			this.grid[x] = [];
			for (let y = 0; y < this.gridSize; y++) {
				this.grid[x][y] = null;
			}
		}
		this.ships = [];
		this.missedAttacks = [];
	}

	placeShip(length, xPos, yPos) {
		// Check board boundaries
		const endPos = xPos + length - 1;
		if (
			endPos > this.gridSize ||
			xPos < 0 ||
			this.gridSize < xPos ||
			yPos < 0 ||
			this.gridSize <= yPos
		) {
			console.error(
				`Cannot place ship: Out of bounds at [${yPos}, ${xPos}] for length ${length}.`
			);
			return null;
		}

		// Check for Overlaps
		for (let i = 0; i < length; i++) {
			if (this.grid[yPos][xPos + i] !== null) {
				console.error(
					`Cannot place ship: Cells are already occupied at [${
						yPos + i
					}, ${xPos}].`
				);
				return null;
			}
		}

		// Place the Ship and Update State
		const newShip = new Ship(length);
		this.ships.push(newShip);

		for (let i = 0; i < length; i++) {
			this.grid[yPos][xPos + i] = newShip;
		}

		return newShip;
	}

	receiveAttack(xPos, yPos) {
		// Check board boundaries
		if (
			xPos < 0 ||
			this.gridSize <= xPos ||
			yPos < 0 ||
			this.gridSize <= yPos
		) {
			console.error(`Attack out of bounds: [${yPos}, ${xPos}].`);
			return null;
		}

		const targetCell = this.grid[yPos][xPos];

		// Prevent Duplicate Attacks
		if (targetCell === 'hit' || targetCell === 'miss') {
			console.warn(`Coordinate [${yPos}, ${xPos}] has already been attacked.`);
			return null;
		}

		// Check for a Hit
		if (targetCell !== null) {
			const hitShip = targetCell;
			hitShip.hit();
			this.grid[yPos][xPos] = 'hit';
			console.log('Target ship hit!');
			return true;
		} else {
			this.grid[yPos][xPos] = 'miss';
			this.missedAttacks.push([yPos, xPos]);
			console.log('Missed!');
			return false;
		}
	}

	allShipsSunk() {
		// Iterate Through Ships
		// Check Each Ship's Status
		// Determine the Outcome
		return this.ships.every((ship) => ship.isSunk());
	}
}

// module.exports = Gameboard;
export default Gameboard;
