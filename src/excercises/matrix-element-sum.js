// https://app.codesignal.com/arcade/intro/level-2/xskq4ZxLyqQMCLshr
// After becoming famous, the CodeBots decided to move into a new building together. Each of the rooms has a different cost, and some of them are free, but there's a rumour that all the free rooms are haunted! Since the CodeBots are quite superstitious, they refuse to stay in any of the free rooms, or any of the rooms below any of the free rooms.
// Given matrix, a rectangular matrix of integers, where each value represents the cost of the room, your task is to return the total sum of all rooms that are suitable for the CodeBots (ie: add up all the values that don't appear below a 0).

function solution(matrix) {
	var total = 0;

	// Navigate each column of rooms
	// i = current column, j = current floor in column
	for (var i = 0; i < matrix[0].length; i++) {
		console.log("i", i, "matrix[0]", matrix[0][i]);
		for (var j = 0; j < matrix.length; j++) {
			if (matrix[j][i] === 0) {
				console.log(matrix[j][i]);
				// This room is haunted, so we don't care about the rooms below it.
				// Continue to the next column of rooms
				break;
			}

			total += matrix[j][i];
			console.log(total);
		}
	}
	console.log(total);
	return total;
}

const matrix = [
	[1, 1, 1, 0],
	[0, 5, 0, 1],
	[2, 1, 3, 10],
];

solution(matrix);
