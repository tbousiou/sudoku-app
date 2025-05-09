import React from 'react'

function Square({ value, handleClick, isInitial,  rowIndex, colIndex }) {
    // Determine if this square should have special borders
    const topBorder = rowIndex % 3 === 0 ? 'border-t-2 border-t-black' : '';
    const leftBorder = colIndex % 3 === 0 ? 'border-l-2 border-l-black' : '';
    const rightBorder = colIndex % 3 === 2 ? 'border-r-2 border-r-black' : '';
    const bottomBorder = rowIndex % 3 === 2 ? 'border-b-2 border-b-black' : '';
    
    return (
        <div 
            onClick={handleClick}
            
            className={`
                w-12 h-12 
                border border-b-gray-600
                ${topBorder}
                ${leftBorder}
                ${rightBorder}
                ${bottomBorder}
                select-none
                flex items-center justify-center
                text-lg
                ${isInitial ? 'font-bold cursor-not-allowed' : 'cursor-pointer'}
            `}
        >
            {value || ''}
        </div>
    )
}

export default Square