import React, { createContext, useContext, useReducer, useEffect, type ReactNode } from "react";
import { SET_LOADING, SET_STORIES, HANDLE_PAGE, HANDLE_SEARCH } from "./actions";
import reducer from "./reducer";
import type { HackerNewsState } from "./types";

const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?";

const initialState: HackerNewsState = {
  isLoading: false,
  page: 0,
  hits: [],
  nbPages: 0,
  handlePage: (page: string) => {
    page;
  },
  handleSearch: (query: string) => {
    query;
  },
};

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext<HackerNewsState>(initialState);

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchApiData = async (url: string) => {
    dispatch({ type: SET_LOADING });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({
        type: SET_STORIES,
        payload: {
          hits: data.hits,
          nbPages: data.nbPages,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePage = (value: string): void => {
    dispatch({ type: HANDLE_PAGE, payload: value });
  };

  const handleSearch = (query: string): void => {
    dispatch({ type: HANDLE_SEARCH, payload: query });
  };

  useEffect(() => {
    fetchApiData(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
  }, [state.page, state.query]);

  return (
    <AppContext.Provider value={{ ...state, handlePage, handleSearch }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = (): HackerNewsState => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
