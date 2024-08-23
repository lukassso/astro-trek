import React from 'react';
import styles from './table.module.scss';

export const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <table className={styles.table}>{children}</table>;
};
