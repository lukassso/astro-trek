import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import styles from "./currency-cards.module.scss";
import type { CurrencyTableTypes } from "@/features/nbp-currency-explorer/types";

const CurrencyCards: React.FC<CurrencyTableTypes> = ({ rates }) => {
  return (
    <>
      {rates.map((rate) => (
        <div key={rate.code} className={styles.card}>
          <Card>
            <div className={styles.cardContent}>
              <div className={styles.cardRow}>
                <span className={styles.label}>Currency:</span>
                <span>{rate.currency}</span>
              </div>
              <div className={styles.cardRow}>
                <span className={styles.label}>Code:</span>
                <span>{rate.code}</span>
              </div>
              <div className={styles.cardRow}>
                <span className={styles.label}>Rate:</span>
                <span className={styles.boldText}>{rate.mid.toFixed(4)}</span>
              </div>
              <div className={styles.buttonRow}>
                <Link to={`/nbp-currency-explorer/${rate.code}`}>
                  <Button variant="outline" size="lg">
                    View
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </>
  );
};

export default CurrencyCards;
