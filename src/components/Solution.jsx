import { useEffect, useState } from 'react'

export default function Solution({ data }) {

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

    <div className="grid grid-rows-9 my-2 mx-auto border-2 border-gray-800 w-fit">
      {solutionRows.map((row, rowIndex) => (
        <div key={rowIndex} className="solution-row grid grid-cols-9 ">
          {row.split('').map((cell, cellIndex) => (
            <div key={cellIndex} className="solution-cell w-[40px] h-[40px] flex items-center justify-center border border-gray-300 text-[16px] font-bold bg-gray-100">
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}