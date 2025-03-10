import { createContext, useContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";
import { subDays } from "date-fns";
import type { DateRange } from "../types";

export interface DateRangeContextProps {
  dateRange: DateRange | undefined;
  setDateRange: Dispatch<SetStateAction<DateRange | undefined>>;
}

const DateRangeContext = createContext<DateRangeContextProps | undefined>(undefined);

export const useDateRange = () => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }
  return context;
};

export const DateRangeProvider = ({ children }: { children: ReactNode }) => {
  const today = new Date();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(today, 30),
    to: today,
  });

  return (
    <DateRangeContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </DateRangeContext.Provider>
  );
};
