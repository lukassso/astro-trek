import { useEffect, type ReactNode } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CurrencyDetails from "./pages/CurrencyDetails";

const NoIndexWrapper = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);

    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return <>{children}</>;
};

function AppRouting() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/nbp-currency-explorer" element={<Home />} />
        <Route
          path="/nbp-currency-explorer/:code"
          element={
            <NoIndexWrapper>
              <CurrencyDetails />
            </NoIndexWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouting;
