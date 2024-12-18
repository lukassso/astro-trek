import { BalanceComponent } from "./components/BalanceComponent";
import { NewTransactionComponent } from "./components/NewTransactionComponent";
import { TableComponent } from "./components/TableComponent";
import { AppProvider } from "@/features/dashboards/bank-transactions/context";

export const BankTransactionComponent = () => (
  <AppProvider>
    <div className="grid gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 ">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 ">
          <BalanceComponent />
        </div>
        <NewTransactionComponent />
      </div>
      <div className="overflow-hidden">
        <TableComponent />
      </div>
    </div>
  </AppProvider>
);
