class Ship {
	constructor(length) {
		this.length = length;
		this.noTimesHit = 0;
	}

	hit() {
		this.noTimesHit++;
	}

	isSunk() {
		return this.noTimesHit >= this.length;
	}
}
