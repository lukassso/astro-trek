import { useState } from "react";

export default function UrlScraper() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/scraper?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err) {
      setResult("Error while scraping the page.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-cente p-4">
      <div className="w-full max-w-xl">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste address URL..."
          className="w-full p-3 text-gray-700 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleScrape}
          className="mt-4 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Scraping..." : "Scrape URL"}
        </button>
      </div>

      {result && (
        <div className="mt-6 w-full max-w-3xl bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg text-gray-700 font-semibold mb-2">Result:</h2>
          <pre className="whitespace-pre-wrap break-words text-sm text-gray-800">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}
