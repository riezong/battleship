const container = document.querySelector('.container');

// Render both players' boards

const domManager = (function () {
	const renderBoard = function (player, gridContainerElement) {
		const playerBoard = player.gameboard.grid;
		console.log(playerBoard.length);
		const gridContainer = document.getElementById(gridContainerElement);

		// Loop through grid
		for (let i = 0; i < playerBoard.length; i++) {
			const gridRow = document.createElement('div');
			gridRow.classList.add('row');
			gridContainer.appendChild(gridRow);
			for (let j = 0; j < playerBoard[i].length; j++) {
				const gridSquare = document.createElement('div');
				gridSquare.classList.add('column');
				// gridSquare.textContent = `${j},${i}`;
				// gridSquare.textContent = playerBoard[i][j];

				// Check cellContent
				const cellContent = playerBoard[i][j];
				if (cellContent !== null) {
					if (cellContent === 'miss') {
						gridSquare.classList.add('miss');
						gridSquare.textContent = 'Miss';
					} else if (cellContent === 'hit') {
						gridSquare.classList.add('hit');
						gridSquare.textContent = 'Hit';
					} else {
						gridSquare.classList.add('ship');
						gridSquare.textContent = 'Ship';
					}
				} else {
					gridSquare.textContent = `${j},${i}`;
				}

				gridRow.appendChild(gridSquare);
			}
		}
	};

	return { renderBoard };
})();

export default domManager;
