import React, { useEffect, useState } from 'react'

export default function Puzzle({ data }) {

    const [puzzle, setPuzzle] = useState(data.puzzle);
    const [difficulty, setDifficulty] = useState(data.difficulty);
    const [solution, setSolution] = useState(data.solution);

    useEffect(() => {
        setPuzzle(data.puzzle);
        setDifficulty(data.difficulty);
        setSolution(data.solution);
    }
        , [data]);


    const solutionRows = solution ? solution.match(/.{1,9}/g) : [];

    return (
        <div className="puzzle-container">
          <h2 className="text-lg font-bold mb-2">Puzzle Information</h2>
          <div>
            <strong>Puzzle:</strong> {puzzle}
          </div>
          <div>
            <strong>Difficulty:</strong> {difficulty}
          </div>
          <h3 className="text-lg font-bold mt-4">Solution</h3>
          <div className="solution-grid">
            {solutionRows.map((row, rowIndex) => (
              <div key={rowIndex} className="solution-row">
                {row.split('').map((cell, cellIndex) => (
                  <div key={cellIndex} className="solution-cell">
                    {cell}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    }