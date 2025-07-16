import Ship from './battleship';

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

	placeShip(length, xPos, yPos) {
		if (
			yPos + length > this.gridSize ||
			yPos < 0 ||
			xPos < 0 ||
			xPos >= this.gridSize
		) {
			console.error(
				`Cannot place ship: Out of bounds at [${xPos}, ${yPos}] for length ${length}.`
			);
			return null;
		}

		for (let i = 0; i < length; i++) {
			if (this.grid[xPos + i][yPos] !== null) {
				console.error(
					`Cannot place ship: Cells are already occupied at [${
						xPos + i
					}, ${yPos}].`
				);
				return null;
			}
		}

		const newShip = new Ship(length);
		this.ships.push(newShip);

		for (let i = 0; i < length; i++) {
			this.grid[xPos][yPos + i] = newShip;
		}

		return newShip;
	}

	receiveAttack(xPos, yPos) {
		if (
			xPos < 0 ||
			xPos >= this.gridSize ||
			yPos < 0 ||
			yPos >= this.gridSize
		) {
			console.error(`Attack out of bounds: [${xPos}, ${yPos}].`);
			return null;
		}

		const targetCell = this.grid[xPos][yPos];

		if (targetCell === 'hit' || targetCell === 'miss') {
			console.warn(`Coordinate [${xPos}, ${yPos}] has already been attacked.`);
			return null;
		}

		if (targetCell !== null) {
			const hitShip = targetCell;
			hitShip.hit();
			this.grid[xPos][yPos] = 'hit';
			console.log('Target ship hit!');
			return true;
		} else {
			this.grid[xPos][yPos] = 'miss';
			this.missedAttacks.push([xPos, yPos]);
			console.log('Missed!');
			return false;
		}
	}

	allShipsSunk() {
		return this.ships.every((ship) => ship.isSunk());
	}
}

module.exports = Gameboard;
