// https://www.codewars.com/kata/5a353a478f27f244a1000076
// Write an async function which takes an apiUrl and jokeId which returns a promise.
// The data will need to be filtered to get the specified joke by id.
// When you got the joke it should be accessible through a simple API of saySetup and sayPunchLine methods.

async function sayJoke(apiUrl, jokeId) {
	// use mocked `fetch(url)`
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();

		console.log("data", data);

		if (!data.jokes) {
			throw new Error("No jokes at url");
		}

		const joke = data.jokes.find((j) => j.id === jokeId);

		if (!joke) {
			throw new Error(`No joke at id ${jokeId}`);
		}

		return {
			saySetup: () => joke.setup,
			sayPunchLine: () => joke.punchLine,
		};
	} catch (error) {
		throw error;
	}
}

// version 2

function sayJoke(apiUrl, jokeId) {
	return fetch(apiUrl)
		.then((response) => response.json())
		.then(({ jokes }) =>
			jokes
				? jokes.find((joke) => joke.id === jokeId)
				: Promise.reject(new Error(`No jokes at url: ${apiUrl}`)),
		)
		.then((joke) =>
			joke
				? { saySetup: () => joke.setup, sayPunchLine: () => joke.punchLine }
				: Promise.reject(new Error(`No jokes found id: ${jokeId}`)),
		);
}
