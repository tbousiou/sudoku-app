import { useState } from 'react'
import { getSudoku } from 'sudoku-gen';

import Board from './components/Board'
import Puzzle from './components/Puzzle'

import './App.css'


function App() {
  
  const [sudoku, setSudoku] = useState(getSudoku('easy'));
  const [initialSudoku, setInitialSudoku] = useState(sudoku); // Store the initial state
  const [difficulty, setDifficulty] = useState('easy');
  const [isSolved, setIsSolved] = useState(false);

  //console.log(sudoku);

  function newGame() {
    const newSudoku = getSudoku(difficulty);
    setSudoku(newSudoku);
    setInitialSudoku(newSudoku); // Update the initial state
    setIsSolved(false);
  }

  // Function to restart the game
  function restartGame() {
    // setSudoku(initialSudoku); // Reset the game to the initial state
    setSudoku({ ...initialSudoku }); // Create a new reference, to force re-render
    setIsSolved(false);
  }

  // Callback to handle when the Sudoku is solved
  function handleSolved() {
    setIsSolved(true);
  }

  return (
    <>
      <div className='bg-gray-100 h-screen'>
        <header className='bg-amber-700 p-4 flex justify-center'>
          <h1 className='text-3xl text-gray-100 '>Sudoku app</h1>
        </header>

        <main>
          <div className='flex justify-center mt-4 gap-4'>
            <button className='bg-blue-500 text-white p-2 rounded-md' onClick={newGame}>New Game</button>
            
            <select name="difficulty" id="" onChange={(e) => {
              setDifficulty(e.target.value);
              // console.log(e.target.value);
            }}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>

              <option value="hard">Hard</option>
              <option value="expert">Expert</option>
            </select>
            <button className='bg-blue-500 text-white p-2 rounded-md' onClick={restartGame} >Restart Game</button>
          </div>
          <div className='flex justify-center mt-4 gap-4'>
            <Puzzle data={sudoku} />
          </div>
          {isSolved && (
            <div className='flex justify-center mt-4'>
              <h2 className='text-green-500 text-2xl'>Sudoku Solved!</h2>
            </div>
          )}
          <Board initialSudoku={sudoku} onSolved={handleSolved} />
        </main>


      </div>

    </>
  )
}

export default App
