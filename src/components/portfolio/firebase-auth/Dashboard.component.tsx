const DashboardComponent = () => (
	<>
		<h1>Welcome</h1>
		<p>We are happy to see you here</p>
		<form action="/api/auth/signout">
			<button type="submit">Sign out</button>
		</form>
	</>
);

export default DashboardComponent;
