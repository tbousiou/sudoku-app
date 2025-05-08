import React from 'react'

function Square({ value, handleClick, isInitial }) {
    // 
    
    return (
        <div 
            onClick={handleClick} 
            className={`
                w-14 h-14 
                border border-b-gray-600
                select-none
                flex items-center justify-center
                ${isInitial ? 'font-bold cursor-not-allowed' : 'cursor-pointer'}
            `}
        >
            {value || ''}
        </div>
    )
}

export default Square