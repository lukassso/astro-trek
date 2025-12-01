// https://app.codesignal.com/arcade/intro/level-3/9DgaPsE2a7M6M2Hu6
// Write a function that reverses characters in (possibly nested) parentheses in the input string.
// Input strings will always be well-formed with matching ()s.

function solution(inputString) {
	const stack = [];

	for (let char of inputString) {
		if (char === ")") {
			let reversedSubstring = "";
			while (stack.length > 0 && stack[stack.length - 1] !== "(") {
				reversedSubstring = stack.pop() + reversedSubstring;
			}
			stack.pop();

			stack.push(...reversedSubstring.split("").reverse());
		} else {
			stack.push(char);
		}
	}

	return stack.join("");
}

console.log(solution("(bar)")); // Output: "rab"
console.log(solution("foo(bar)baz")); // Output: "foorabbaz"
console.log(solution("foo(bar)baz(blim)")); // Output: "foorabbazmilb"
console.log(solution("foo(bar(baz))blim")); // Output: "foobazrabblim"


