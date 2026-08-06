// https://leetcode.com/problems/rotate-image/description/
// You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
// You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

function solution(a) {
	const n = a.length;

	for (let i = 0; i < n; i++) {
		for (let j = i; j < n; j++) {
			const temp = a[i][j];
			a[i][j] = a[j][i];
			a[j][i] = temp;
		}
	}
	for (let i of a) {
		i.reverse();
	}
}

// version 2
// solution = a => a.map((row, rowIndex) => a.map(val => val[rowIndex]).reverse())

const a = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
];

rotateImage(a);

console.log(a);
