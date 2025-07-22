import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { CurrencyRate } from "../types";
import Spinner from "@/components/portfolio/nbp-currency-explorer/components/Spinner";
import CurrencyConverter from "@/components/portfolio/nbp-currency-explorer/components/CurrencyConverter";
import { fetchCurrencyRates } from "../fetchCurrencyRates";
import styles from "@/components/portfolio/nbp-currency-explorer/components/table/table.module.scss";
import { useMediaQuery } from "@/hooks/use-media-query";
import CurrencyTable from "@/components/portfolio/nbp-currency-explorer/components/table/CurrencyTable";
import CurrencyCards from "@/components/portfolio/nbp-currency-explorer/components/currency-cards/CurrencyCards";

export default function HomePage() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const rates = await fetchCurrencyRates();
        setCurrencyRates(rates);
      } catch (error) {
        console.error("Error fetching currency rates:", error);
        setError("Failed to load currency rates.");
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <CurrencyConverter />
      <Card>
        <CardHeader>
          <CardTitle>Currency Exchange Rates</CardTitle>
          <CardDescription>
            Real-time exchange rates from the National Bank of Poland (NBP)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className={styles.tableContainer}>
            {!isDesktop ? (
              <CurrencyCards rates={currencyRates} />
            ) : (
              <CurrencyTable rates={currencyRates} />
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
