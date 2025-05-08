import { useState } from 'react'
import Square from './components/Square'
import Board from './components/Board'
import { testBoard } from './utils/boards.js'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-gray-100 h-screen'>
        <header className='bg-amber-700 p-4 flex justify-center'>
          <h1 className='text-3xl text-gray-100 '>Sudoku app</h1>
        </header>

        <main>
          <Board data={testBoard} />
        </main>


      </div>

    </>
  )
}

export default App
