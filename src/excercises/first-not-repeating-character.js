// https://app.codesignal.com/interview-practice/question/uX5iLwhc6L5ckSyNC/description
// Given a string s consisting of small English letters, find and return the first instance of a non-repeating character in it. If there is no such character, return '_'.

function firstNotRepeatingCharacter(s) {
	let map = new Map();
	for (i of s) {
		console.log("i", i);
		if (map.has(i)) {
			map.set(i, map.get(i) + 1);
			console.log("map has", map);
		} else {
			console.log("map hasn't", map.set(i));
			map.set(i, 1);
		}
	}
	for (i of s) {
		if (map.get(i) === 1) {
			console.log("i", i);
			return i;
		}
	}
	return '_';
}

console.log(firstNotRepeatingCharacter("abacabad"));
