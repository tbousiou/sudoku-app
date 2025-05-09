export function transformToGrid(sudokuData) {
  if (!sudokuData || !sudokuData.puzzle) {
    return [];
  }
  
  const puzzleString = sudokuData.puzzle;
  const dimension = 9; // Standard sudoku size
  const grid = [];
  
  // Create 2D array with objects
  for (let i = 0; i < dimension; i++) {
    const row = [];
    for (let j = 0; j < dimension; j++) {
      const index = i * dimension + j;
      const char = puzzleString[index];
      
      row.push({
        value: char, // Keep as character, don't convert to number yet
        isInitial: char !== '-' // Still use this to determine if it's an initial value
      });
    }
    grid.push(row);
  }
  
  return grid;
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



