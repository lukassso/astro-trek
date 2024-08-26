import React from 'react';
import styles from './table.module.scss';

export const TableRow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <tr className={styles.row}>{children}</tr>;
};
