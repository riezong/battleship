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
		if (this.grid[xPos][yPos]) {
		} else return false;
	}

	allShipsSunk() {}
}

module.exports = Gameboard;
