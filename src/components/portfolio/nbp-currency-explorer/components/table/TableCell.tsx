import React from "react";
import styles from "./table.module.scss";
import clsx from "clsx";
import type { TableCellProps } from "@/features/nbp-currency-explorer/types";

export const TableCell: React.FC<TableCellProps> = ({ className, children }) => {
  return <td className={clsx(styles.cell, className)}>{children}</td>;
};
