import { type FC, createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import reducer from "./reducer";
import {
  SET_LOADING,
  SET_TRANSACTIONS,
  SET_PAGE,
  SET_FILTERED_TRANSACTIONS,
  DELETE_TRANSACTION,
  ADD_TRANSACTION,
} from "./actions";
import { type TransactionsState, type Transaction, type AppContextValue } from "./types";
import localTransactionsData from "./mock/db.json";

const API_ENDPOINT = "http://localhost:3000/transactions?";

const saveStateToLocalStorage = (state: TransactionsState) => {
  localStorage.setItem("transactionsState", JSON.stringify(state));
};

const loadStateFromLocalStorage = (): TransactionsState | null => {
  const savedState =
    typeof localStorage !== "undefined" && localStorage.getItem("transactionsState");
  return savedState ? JSON.parse(savedState) : null;
};

const initalState: TransactionsState = {
  transactions: [],
  isLoading: false,
  currentPage: 1,
  itemsPerPage: 10,
  query: "",
};

const AppContext = createContext<AppContextValue>(initalState);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, loadStateFromLocalStorage() || initalState);

  const fetchApiData = async () => {
    dispatch({ type: SET_LOADING });
    try {
      let transactions = [];

      if (process.env.NODE_ENV !== "development") {
        transactions = localTransactionsData.transactions || [];
      } else {
        const response = await fetch(API_ENDPOINT);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        transactions = data || [];
      }

      dispatch({
        type: SET_TRANSACTIONS,
        payload: {
          transactions: transactions,
        },
      });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const setPage = (page: number): void => {
    dispatch({ type: SET_PAGE, payload: { page } });
  };

  const handleSearch = (query: string): void => {
    dispatch({ type: SET_FILTERED_TRANSACTIONS, payload: { query } });
  };

  const deleteTransaction = (id: number): void => {
    dispatch({ type: DELETE_TRANSACTION, payload: { id } });
  };

  const addTransaction = (transaction: Transaction): void => {
    dispatch({ type: ADD_TRANSACTION, payload: { transaction } });
  };

  useEffect(() => {
    saveStateToLocalStorage(state);
  }, [state]);

  useEffect(() => {
    fetchApiData();
  }, []);

  const contextValue = {
    ...state,
    setPage,
    handleSearch,
    deleteTransaction,
    addTransaction,
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
