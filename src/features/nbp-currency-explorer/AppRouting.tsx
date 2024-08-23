import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CurrencyDetails from "./pages/CurrencyDetails";

function AppRouting() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/nbp-currency-explorer" element={<Home />} />
				<Route path="/nbp-currency-explorer/:code" element={<CurrencyDetails />} />
			</Routes>
		</BrowserRouter>
	);
}

export default AppRouting;
