import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import type { CurrencyDetails } from "@/features/nbp-currency-explorer/types";
import Spinner from "@/components/portfolio/nbp-currency-explorer/components/Spinner";
import ChartComponent from "@/components/portfolio/nbp-currency-explorer/components/ChartComponent";
import { DateRangePicker } from "@/components/portfolio/nbp-currency-explorer/components/DateRangePicker";
import { useDateRange } from "@/features/nbp-currency-explorer/context/DateRangeContext";

export default function CurrencyDetailsPage() {
  const { code } = useParams<{ code: string }>();
  const { dateRange } = useDateRange();
  const [currencyData, setCurrencyData] = useState<CurrencyDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrencyDetails = useCallback(async () => {
    if (!dateRange?.from || !dateRange?.to) return;

    try {
      setLoading(true);
      const response = await fetch(
        `https://api.nbp.pl/api/exchangerates/rates/A/${code}/${format(
          dateRange.from,
          "yyyy-MM-dd",
        )}/${format(dateRange.to, "yyyy-MM-dd")}/`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: CurrencyDetails = await response.json();
      setCurrencyData(data);
    } catch (error) {
      console.error("Error fetching currency details:", error);
      setError("Failed to load currency details.");
    } finally {
      setLoading(false);
    }
  }, [code, dateRange]);

  useEffect(() => {
    fetchCurrencyDetails();
  }, [fetchCurrencyDetails]);

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <h1 className="text-3xl font-bold">Details for {currencyData?.currency}</h1>
      <p>Code: {currencyData?.code}</p>
      <DateRangePicker />
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <ChartComponent
          data={
            currencyData?.rates.map((rate) => ({
              effectiveDate: rate.effectiveDate,
              mid: rate.mid,
            })) || []
          }
        />
      )}
    </section>
  );
}
