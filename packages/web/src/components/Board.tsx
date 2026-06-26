import React from 'react';
import Cell from './Cell';
import styles from '../styles/Board.module.css';
import { Board as BoardType } from '@init-sudoku-post2/contracts';

interface BoardProps {
  board: BoardType;
  /** Callback when a cell value changes. */
  onCellChange: (row: number, col: number, value: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onCellChange }) => {
  return (
    <div className={styles.board}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cellValue, colIndex) => (
            <Cell
              key={colIndex}
              row={rowIndex}
              col={colIndex}
              value={cellValue}
              onChange={onCellChange}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
