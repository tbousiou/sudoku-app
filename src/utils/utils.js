export function transformToBoard(sudokuData) {
  // console.log('Sudoku Data:', sudokuData);
  if (!sudokuData || !sudokuData.puzzle) {
    return [];
  }

  const puzzleString = sudokuData.puzzle;
  const dimension = 9; // Standard sudoku size
  const board = [];

  // Create 2D array with objects
  for (let i = 0; i < dimension; i++) {
    const row = [];
    for (let j = 0; j < dimension; j++) {
      const index = i * dimension + j;
      const char = puzzleString[index];

      const cell = char === '-' ? {
        value: null,
        isInitial: false // This cell is empty and not an initial value
      } : {
        value: parseInt(char), // Convert to number
        isInitial: true // This cell is an initial value
      };


      row.push(cell);
    }
    board.push(row);
  }
  // console.log('Transformed Board:', board);
  return board;
}


export function isSudokuSolved(board) {
  // console.log('Checking if Sudoku is solved...');
  // console.log('Board:', board);

  // Extract the values from the grid objects
  const extractValues = (arr) => arr.map(cell => cell.value);

  // Check if the board is 9x9
  if (board.length !== 9 || board.some(row => row.length !== 9)) {
    return false;
  }

  // Check each row for uniqueness and valid numbers (1-9)
  for (const row of board) {
    const rowValues = extractValues(row);
    // console.log('Row Values:', rowValues);
    if (!isValidSet(rowValues)) {
      return false;
    }
  }

  // Check each column for uniqueness
  for (let col = 0; col < 9; col++) {
    const column = board.map(row => row[col].value);
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
          box.push(board[boxRow * 3 + i][boxCol * 3 + j].value);
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
  const actualSet = new Set(arr.filter(num => num !== null)); // Exclude empty cells (null)

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