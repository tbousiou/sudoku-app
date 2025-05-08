export const testBoard = [
    [null, null, 7, 5, null, null, 6, null, 3],
    [4, 3, null, null, null, 6, null, null, 5],
    [6, null, 8, 1, null, 9, null, 2, 7],
    [2, null, 6, 4, 5, null, null, null, null],
    [null, null, 1, null, 6, null, 3, 4, null],
    [7, null, null, null, null, 8, null, 5, null],
    [8, null, null, 7, null, null, 1, 3, null],
    [null, 7, 4, null, 2, null, 5, 9, null],
    [1, null, 9, 3, null, 5, null, null, null]
];

export const transformToGrid = (board) => {
    return board.map(row => {
        return row.map(cell => {
            return { value: cell, isInitial: cell !== null };
        });
    });
}


export function isSudokuSolved(board) {
    // Check if the board is 9x9
    if (board.length !== 9 || board.some(row => row.length !== 9)) {
      return false;
    }
  
    // Check each row for uniqueness and valid numbers (1-9)
    for (const row of board) {
      if (!isValidSet(row)) {
        return false;
      }
    }
  
    // Check each column for uniqueness
    for (let col = 0; col < 9; col++) {
      const column = board.map(row => row[col]);
      if (!isValidSet(column)) {
        return false;
      }
    }
  
    // Check each 3x3 sub-grid for uniqueness
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const box = [];
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            box.push(board[boxRow * 3 + i][boxCol * 3 + j]);
          }
        }
        if (!isValidSet(box)) {
          return false;
        }
      }
    }
  
    return true;
  }
  
  // Helper function to check if an array contains all numbers 1-9 exactly once
  function isValidSet(arr) {
    const validSet = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const actualSet = new Set(arr);
    
    // Check if the sets have the same size and all elements match
    if (actualSet.size !== 9) {
      return false;
    }
    
    for (const num of actualSet) {
      if (!validSet.has(num)) {
        return false;
      }
    }
    
    return true;
  }



