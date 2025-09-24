const container = document.querySelector('.container');

// Create grid elements
// Render the boards
// Attach event listeners

const domManager = (function () {
	const clearBoard = function (player, gridContainerElement) {
		const gridContainer = document.getElementById(gridContainerElement);
		while (gridContainer.firstChild) {
			gridContainer.removeChild(gridContainer.lastChild);
		}
	};

	const renderBoard = function (player, gridContainerElement) {
		// console.log(player);
		clearBoard(player, gridContainerElement);

		const playerBoard = player.gameboard.grid;
		const gridContainer = document.getElementById(gridContainerElement);

		// Loop through grid
		for (let i = 0; i < playerBoard.length; i++) {
			const gridRow = document.createElement('div');
			gridRow.classList.add('row');
			gridContainer.appendChild(gridRow);
			for (let j = 0; j < playerBoard[i].length; j++) {
				const gridSquare = document.createElement('div');
				gridSquare.classList.add('cell');
				gridSquare.setAttribute('id', `${j}-${i}`);

				// Check cellContent
				const cellContent = playerBoard[i][j];
				if (cellContent !== null) {
					if (cellContent === 'miss') {
						gridSquare.classList.add('miss');
						gridSquare.classList.add('attacked');
						gridSquare.textContent = 'Miss';
					} else if (cellContent === 'hit') {
						gridSquare.classList.add('hit');
						gridSquare.classList.add('attacked');
						gridSquare.textContent = 'Hit';
					} else {
						// Hide CPU ships from board
						if (player.name === 'Human') {
							gridSquare.classList.add('ship');
							gridSquare.textContent = 'Ship';
						} else {
							gridSquare.textContent = `${j},${i}`;
						}
					}
				} else {
					gridSquare.textContent = `${j},${i}`;
				}

				gridRow.appendChild(gridSquare);
			}
		}
	};

	// Add event listener for Grid to determine which square (on the CPU board) that the player clicked on. If it's a ship, mark as hit, if not, mark as miss.
	const addAttackListeners = function (gridContainerElement, callback) {
		// Event delegation. Have unique ids for each div to help identify
		let grid = document.getElementById(gridContainerElement);
		grid.addEventListener('click', (event) => {
			let target = event.target.id;

			// If the target doesn't have the 'cell' class, stop immediately.
			if (!event.target.classList.contains('cell')) {
				return;
			}
			// console.log(target);
			// Split the id to separate coordinates to find out the cell value
			let targetX = target.split('-')[0];
			let targetY = target.split('-')[1];
			callback(targetX, targetY);
		});
	};

	const renderGameOverScreen = function (winner) {
		const gameOver = document.getElementById('game-over');
		gameOver.classList.toggle('hidden');

		console.log(`${winner} wins!`);

		const gameOverMsg = document.getElementById('game-over-message');
		const msg = document.createElement('div');
		msg.textContent = `${winner} wins!`;
		gameOverMsg.appendChild(msg);
	};

	return {
		renderBoard: renderBoard,
		addAttackListeners: addAttackListeners,
		renderGameOverScreen: renderGameOverScreen,
	};
})();

export default domManager;
