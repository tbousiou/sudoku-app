import React from 'react'

function Square({ value, handleClick, isInitial }) {
    // 
    
    return (
        <div 
            onClick={handleClick} 
            className={`
                w-10 h-10 
                border border-b-gray-600
                flex items-center justify-center
                ${isInitial ? 'font-bold cursor-not-allowed' : 'cursor-pointer'}
            `}
        >
            {value || ''}
        </div>
    )
}

export default Square