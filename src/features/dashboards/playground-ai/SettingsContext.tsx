import React from "react";
import { useLocalObservable } from "mobx-react-lite";
import settingsStore from "./SettingsStore";
import type { SettingsStoreType } from "./types";

const SettingsContext = React.createContext<SettingsStoreType | null>(null);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useLocalObservable(() => settingsStore);
  return <SettingsContext.Provider value={store}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
