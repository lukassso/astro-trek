export const fetchCurrencyRates = async () => {
  const response = await fetch("https://api.nbp.pl/api/exchangerates/tables/A/");
  if (!response.ok) {
    throw new Error("Failed to fetch currency rates");
  }
  try {
    const data = await response.json();
    if (!data || !data[0] || !data[0].rates) {
      throw new Error("Invalid data structure");
    }
    return data[0].rates;
  } catch (error) {
    console.error("Error parsing currency rates:", error);
    throw new Error("Failed to parse currency rates");
  }
};