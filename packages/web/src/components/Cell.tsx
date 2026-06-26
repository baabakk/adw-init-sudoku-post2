import React, { ChangeEvent, useState } from 'react';
import styles from '../styles/Cell.module.css';

interface CellProps {
  row: number;
  col: number;
  /** Current value of the cell (0 for empty). */
  value: number;
  /** Callback when the cell value changes. */
  onChange: (row: number, col: number, value: number) => void;
}

const Cell: React.FC<CellProps> = ({ row, col, value, onChange }) => {
  const [inputValue, setInputValue] = useState<string>(value === 0 ? '' : String(value));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow only digits 1-9 or empty string
    if (/^[1-9]?$/.test(val)) {
      setInputValue(val);
      const numeric = val === '' ? 0 : Number(val);
      onChange(row, col, numeric);
    }
  };

  return (
    <input
      className={styles.cell}
      type="text"
      value={inputValue}
      onChange={handleChange}
      maxLength={1}
      pattern="[1-9]"
      inputMode="numeric"
    />
  );
};

export default Cell;
