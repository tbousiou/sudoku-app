import React from 'react'
import Square from './Square'
import { useState } from 'react';
import { transformToGrid, isSudokuSolved } from '../utils/boards.js';




export default function Board({ dimension = 9, data }) {

    const initial_grid = transformToGrid(data);

    const [grid, setGrid] = useState(initial_grid);

    function handleClick(rowIndex, colIndex) {
        console.log(`Clicked on row ${rowIndex}, col ${colIndex}`);
        if (!grid[rowIndex][colIndex].isInitial) {
            const newGrid = [...grid];
            
            if (newGrid[rowIndex][colIndex].value === null) {
                newGrid[rowIndex][colIndex] = {
                    ...newGrid[rowIndex][colIndex],
                    value: 1
                };
            } else {
                newGrid[rowIndex][colIndex] = {
                    ...newGrid[rowIndex][colIndex],
                    value: (newGrid[rowIndex][colIndex].value + 1) % (dimension + 1) || 1
                };
            }
            
            setGrid(newGrid);
            // transform the grid to a 2D array
            const transformedGrid = newGrid.map(row => row.map(cell => cell.value));
            const solved = isSudokuSolved(transformedGrid);
            if (solved) {
                alert('Sudoku solved!');
            }
        }
    }

    function validateGrid(grid) {
        // check if the grid is valid
        // check if the grid is a square
        const isSquare = grid.every(row => row.length === grid.length);
        if (!isSquare) {
            throw new Error('Grid must be a square');
        }

        // check if the grid is not empty
        const isEmpty = grid.every(row => row.every(cell => cell.value === null));
        if (isEmpty) {
            throw new Error('Grid must not be empty');
        }

        // check if the grid has duplicates
        const hasDuplicates = grid.some(row => {
            const values = row.map(cell => cell.value).filter(value => value !== null);
            return new Set(values).size !== values.length;
        });
        if (hasDuplicates) {
            throw new Error('Grid has duplicates');
        }
    }

    // if dimension not in range 1-9, throw error
    if (dimension < 1 || dimension > 9) {
        throw new Error('Dimension must be between 1 and 9')
    }



    return (
        <div className='flex flex-col items-center justify-center h-screen '>
            {
                grid.map((row, rowIndex) => (
                    <div key={rowIndex} className='flex'>
                        {row.map((cell, colIndex) => (
                            <Square
                                key={colIndex}
                                value={cell.value}
                                handleClick={!cell.isInitial ? () => handleClick(rowIndex, colIndex) : undefined}
                                isInitial={cell.isInitial}
                            />
                        ))}
                    </div>
                ))
            }

        </div>

    )
}
