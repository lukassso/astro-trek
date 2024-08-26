import { DateRangeProvider } from "@/features/nbp-currency-explorer/context/DateRangeContext";
import AppRouting from "@/features/nbp-currency-explorer/AppRouting";

const NbpCurrencyExplorerComponent = () => (
	<DateRangeProvider>
		<AppRouting />
	</DateRangeProvider>
);

export default NbpCurrencyExplorerComponent;
