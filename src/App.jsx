import { useRef, useState } from 'react'
import { getSudoku } from 'sudoku-gen';

import Board from './components/Board'
import Solution from './components/Solution'

import './App.css'

function App() {

  const [sudoku, setSudoku] = useState(getSudoku('easy'));
  const [initialSudoku, setInitialSudoku] = useState(sudoku); // Store the initial state
  const [difficulty, setDifficulty] = useState('easy');
  const [isSolved, setIsSolved] = useState(false);
  const solutionDialogRef = useRef(null);


  function newGame() {
    const newSudoku = getSudoku(difficulty);
    console.log('New Sudoku:', newSudoku);
    setSudoku(newSudoku);
    setInitialSudoku(newSudoku); // Update the initial state
    setIsSolved(false);
  }

  // Function to restart the game
  function restartGame() {
    // Reset the game to the initial state
    setSudoku({ ...initialSudoku }); // Create a new reference, to force re-render
    setIsSolved(false);
  }

  // Callback to handle when the Sudoku is solved
  function handleSolved() {
    setIsSolved(true);
  }

  function showSolution() {
    if (solutionDialogRef.current) {
      solutionDialogRef.current.showModal(); // Show the dialog
    }
  }

  function closeDialog() {
    if (solutionDialogRef.current) {
      solutionDialogRef.current.close(); // Close the dialog
    }
  }

  return (
    <>
      <div className='bg-gray-100 h-screen'>
        <header className='bg-amber-700 p-4 flex justify-center'>
          <h1 className='text-3xl text-gray-100 '>Sudoku app</h1>
        </header>

        <main>
          <div className='flex justify-center mt-4 gap-6'>
            <button className='bg-blue-500 text-white p-2 rounded-md cursor-pointer' onClick={newGame}>▶️ New Game</button>

            <select name="difficulty" id="" onChange={(e) => {
              setDifficulty(e.target.value);
            }}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>

              <option value="hard">Hard</option>
              <option value="expert">Expert</option>
            </select>
            <button className='bg-blue-500 text-white p-2 rounded-md cursor-pointer' onClick={restartGame} >↩️ Restart</button>
            <button className='bg-blue-500 text-white p-2 rounded-md cursor-pointer' onClick={showSolution}>💡 Show solution</button>
          </div>

          {isSolved && (
            <div className='flex justify-center mt-4'>
              <h2 className='text-green-500 text-2xl'>Sudoku Solved!</h2>
            </div>
          )}
          <Board initialSudoku={sudoku} onSolved={handleSolved} />
          <dialog
            id="solution-dialog"
            ref={solutionDialogRef}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md"
          >
            <h2 className="text-lg font-bold mb-4 text-center">Solution</h2>
            <Solution data={sudoku} />
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 cursor-pointer block mx-auto"
              onClick={closeDialog}
            >
              Close
            </button>
          </dialog>
          <div className='flex flex-col items-center mt-4'>
            <h3 className='text-xl text-amber-600 font-bold'>Instructions</h3>
            <p><span className='font-bold'>Left-click</span> on a cell to fill it with a number. <span className='font-bold'>Right-click </span>to clear the cell.</p>
            <p>Choose <span className='font-bold'>difficulty</span> and then use the <span className="font-bold">"New Game"</span> button to generate a new Sudoku puzzle.</p>
            <p>Use the <span className="font-bold">"Restart"</span> button to reset the current puzzle.</p>
          </div>
        </main>
      </div>
    </>
  )
}

export default App
