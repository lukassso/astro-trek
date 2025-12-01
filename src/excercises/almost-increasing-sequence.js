// https://app.codesignal.com/arcade/intro/level-2/2mxbGwLzvkTCKAJMG
// Given a sequence of integers as an array, determine whether it is possible to obtain a strictly increasing sequence by removing no more than one element from the array.
// Note: sequence a0, a1, ..., an is considered to be a strictly increasing if a0 < a1 < ... < an. Sequence containing only one element is also considered to be strictly increasing.

function solution(sequence) {
	function isStrictlyIncreasing(arr) {
		for (let i = 1; i < arr.length; i++) {
			if (arr[i] <= arr[i - 1]) {
				return false;
			}
		}
		return true;
	}

	if (sequence.length <= 1) {
		return true;
	}

	if (isStrictlyIncreasing(sequence)) {
		return true;
	}

	let removedIndexes = new Set();

	for (let i = 0; i < sequence.length; i++) {
		if (removedIndexes.has(i)) {
			continue;
		}

		let modifiedSequence = [];
		for (let j = 0; j < sequence.length; j++) {
			if (j !== i) {
				modifiedSequence.push(sequence[j]);
			}
		}

		if (isStrictlyIncreasing(modifiedSequence)) {
			return true;
		}

		removedIndexes.add(i);
	}

	return false;
}

console.log(solution([1, 2, 1, 2]));
