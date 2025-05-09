import { useState } from 'react'
import Square from './components/Square'
import Board from './components/Board'

import './App.css'
import { getSudoku } from 'sudoku-gen';

function App() {
  const [sudoku, setSudoku] = useState(getSudoku('easy'));
  const [difficulty, setDifficulty] = useState('easy');



  
  //console.log(sudoku);

  function newGame() {
    const newSudoku = getSudoku(difficulty);
    setSudoku(newSudoku);
    console.log('new game');
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
            <button className='bg-blue-500 text-white p-2 rounded-md'>Restart Game</button>
            <select name="difficulty" id="" onChange={(e) => {
              setDifficulty(e.target.value);
              //console.log(e.target.value);
            }}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>

              <option value="hard">Hard</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <Board data={sudoku} />
        </main>


      </div>

    </>
  )
}

export default App
