class Ship {
	constructor(length) {
		this.length = length;
		this.noTimesHit = 0;
		// this.sunk = false;
	}

	hit() {
		this.noTimesHit++;
	}

	isSunk() {
		return this.noTimesHit >= this.length;
	}
}

module.exports = Ship;
