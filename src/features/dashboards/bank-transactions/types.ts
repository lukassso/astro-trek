export interface Transaction {
  id: number;
  amount: number;
  beneficiary: string;
  account: string;
  address: string;
  date: Date;
  description: string;
}

export interface TransactionsState {
  transactions: Transaction[];
  isLoading: boolean;
  currentPage: number;
  itemsPerPage: number;
  query: string;
}

export interface AppContextValue extends TransactionsState {
  setPage?: (page: number) => void;
  handleSearch?: (query: string) => void;
  deleteTransaction?: (id: number) => void;
  addTransaction?: (transaction: Transaction) => void;
}

export interface Action {
  type: string;
  payload?: any;
}
