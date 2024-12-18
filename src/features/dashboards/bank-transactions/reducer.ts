import type { Reducer } from "react";
import type { TransactionsState, Action } from "./types";
import {
  SET_LOADING,
  SET_TRANSACTIONS,
  SET_PAGE,
  SET_FILTERED_TRANSACTIONS,
  DELETE_TRANSACTION,
  ADD_TRANSACTION,
} from "./actions";

const reducer: Reducer<TransactionsState, Action> = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_TRANSACTIONS:
      return {
        ...state,
        isLoading: false,
        transactions: action.payload.transactions,
      };
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload.page,
      };
    case SET_FILTERED_TRANSACTIONS:
      return {
        ...state,
        query: action.payload.query,
        currentPage: 1,
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload.id,
        ),
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload.transaction],
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default reducer;
