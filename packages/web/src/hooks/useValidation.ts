import { Board, ValidationRule, ValidationRules } from '@init-sudoku-post2/contracts';

/**
 * Hook providing client‑side Sudoku move validation based on the shared
 * ValidationRulesContract. It checks that a newly placed value does not
 * duplicate an existing value in the same row, column, or 3×3 box.
 */
export const useValidation = () => {
  // The set of rules we apply – could be extended via contract in the future.
  const rules: ValidationRules = [ValidationRule.Row, ValidationRule.Column, ValidationRule.Box];

  const validationErrors: string[] = [];

  const validateMove = (board: Board, row: number, col: number, value: number): boolean => {
    // Reset errors
    validationErrors.length = 0;
    if (value === 0) {
      // Empty cell is always allowed
      return true;
    }
    // Row check
    if (rules.includes(ValidationRule.Row)) {
      for (let c = 0; c < 9; c++) {
        if (c !== col && board[row][c] === value) {
          validationErrors.push(`Value ${value} already exists in row ${row + 1}`);
          break;
        }
      }
    }
    // Column check
    if (rules.includes(ValidationRule.Column)) {
      for (let r = 0; r < 9; r++) {
        if (r !== row && board[r][col] === value) {
          validationErrors.push(`Value ${value} already exists in column ${col + 1}`);
          break;
        }
      }
    }
    // Box check (3x3 subgrid)
    if (rules.includes(ValidationRule.Box)) {
      const startRow = Math.floor(row / 3) * 3;
      const startCol = Math.floor(col / 3) * 3;
      for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
          if ((r !== row || c !== col) && board[r][c] === value) {
            validationErrors.push(`Value ${value} already exists in its 3×3 box`);
            r = startRow + 3; // break outer loops
            break;
          }
        }
      }
    }
    return validationErrors.length === 0;
  };

  return { validateMove, validationErrors };
};
