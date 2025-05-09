import React from 'react'
import Square from './Square'
import { useState, useEffect } from 'react';
import { transformToBoard, isSudokuSolved } from '../utils/utils.js';


export default function Board({ dimension = 9, initialSudoku, onSolved }) {

    const initialBoard = transformToBoard(initialSudoku);

    const [board, setBoard] = useState(initialBoard);

    // Update the board state whenever the `initial_sudoku` prop changes
    useEffect(() => {
        //console.log('Received new sudoku puzzle:', board);
        const newBoard = transformToBoard(initialSudoku);
        setBoard(newBoard);
        // console.log('Updated board:', newBoard);
    }, [initialSudoku]);

    function handleClick(rowIndex, colIndex) {
        // console.log(`Clicked on row ${rowIndex}, col ${colIndex}`);
        if (!board[rowIndex][colIndex].isInitial) {
            const newBoard = [...board];

            if (newBoard[rowIndex][colIndex].value === null) {
                console.log('Setting value to 1');
                newBoard[rowIndex][colIndex] = {
                    ...newBoard[rowIndex][colIndex],
                    value: 1
                };
            } else {
                newBoard[rowIndex][colIndex] = {
                    ...newBoard[rowIndex][colIndex],
                    value: (newBoard[rowIndex][colIndex].value + 1) % (dimension + 1) || 1
                };
            }

            setBoard(newBoard);
            console.log('Updated board:', newBoard);
            
            // Check if the Sudoku is solved
            const solved = isSudokuSolved(newBoard);
            if (solved) {
                onSolved(); // Notify the App component
            }
        }
    }



    // if dimension not in range 1-9, throw error
    if (dimension < 1 || dimension > 9) {
        throw new Error('Dimension must be between 1 and 9')
    }



    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <div className="border-2 border-gray-600 bg-white">
                {
                    board.map((row, rowIndex) => (
                        <div key={rowIndex} className='flex'>
                            {row.map((cell, colIndex) => (
                                <Square
                                    key={colIndex}
                                    value={cell.value}
                                    handleClick={!cell.isInitial ? () => handleClick(rowIndex, colIndex) : undefined}
                                    isInitial={cell.isInitial}
                                    rowIndex={rowIndex}
                                    colIndex={colIndex}
                                />
                            ))}
                        </div>
                    ))
                }
            </div>


        </div>

    )
}
