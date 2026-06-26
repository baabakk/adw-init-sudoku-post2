import React from 'react';
import { Difficulty } from '@init-sudoku-post2/contracts';
import styles from '../styles/DifficultySelector.module.css';

interface Props {
  selected: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
}

const DifficultySelector: React.FC<Props> = ({ selected, onSelect }) => {
  const difficulties: Difficulty[] = [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard];

  return (
    <div className={styles.selector}>
      {difficulties.map((d) => (
        <button
          key={d}
          type="button"
          className={`${styles.button} ${selected === d ? styles.selected : ''}`}
          onClick={() => onSelect(d)}
        >
          {d.charAt(0).toUpperCase() + d.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;
