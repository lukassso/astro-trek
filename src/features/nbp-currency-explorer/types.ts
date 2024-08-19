export interface CurrencyRate {
  currency: string;
  code: string;
  mid: number;
}

export interface CurrencyTable {
  rates: CurrencyRate[];
}

export interface CurrencyDetailRate {
  no: string;
  effectiveDate: string;
  mid: number;
}

export interface CurrencyDetails {
  table: string;
  currency: string;
  code: string;
  rates: CurrencyDetailRate[];
}

export interface ChartDataPoint {
  effectiveDate: string;
  mid: number;
}

export interface ChartComponentProps {
  data: ChartDataPoint[];
}

export interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

export interface ExchangeRates {
  [key: string]: number;
}
