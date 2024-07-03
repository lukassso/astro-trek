const SigninComponent = () => (
	<>
		<h1>Sign in</h1>
		<p>
			New here? <a href="/register">Create an account</a>
		</p>
		<form id="login-form" method="post">
			<label for="email" for="email">
				Email
			</label>
			<input type="email" name="email" id="email" />
			<label for="password">Password</label>
			<input type="password" name="password" id="password" />
			<button type="submit">Login</button>
		</form>
		<div>
			<button id="google-signin-button" type="button">
				Sign in with Google
			</button>
		</div>
		<div>
			<button id="github-signin-button" type="button">
				Sign in with GitHub
			</button>
		</div>
	</>
);

export default SigninComponent;
