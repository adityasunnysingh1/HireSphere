import { getDifficultyBadgeClass } from "../lib/utils"
function ProblemDescription({problem, currentProblemId, onProblemChange, allProblems}) {
  return (
    <div className="h-full overflow-y-auto bg-base-200">
        {/* HEADER SECTION */}
        <div className="p-6 bg-base-100 border-b border-base-300">
            <div className="flex items-start justify-between mb-3">
            <h1 className="text-3xl font-bold text-base-content">{problem.title}</h1>
            <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
                {problem.difficulty}
            </span>
            </div>
            <p className="text-base-content/60 ">{problem.category}</p>

            {/* Problem Selector */}
            <div className="mt-4 ">
            <select 
            className="select select-sm w-full"
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
            ></select>

            </div>
        </div>
    </div>
  )
}

export default ProblemDescription