import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProjectContext } from './../project-context';

type Project = {
  id: number,
  name: string,
  description: string,
  dueDate: string,
  tasks: Tasks[]
}

type Tasks = {
  id: number,
  taskName: string
}

function checkOverDue(project: Project) {
  if (Date.now() > Date.parse(project.dueDate)) {
    return <p className="ml-2 pt-2 dark:text-sky-50"><span className='font-semibold'>Due by:</span> <span className='font-semibold'>{project.dueDate}</span> <span className="font-semibold text-red-500 italic">// Project overdue</span></p>;
  } else {
    return <p className="ml-2 pt-2 dark:text-sky-50"><span className='font-semibold'>Due by:</span> {project.dueDate}</p>
  }
}

export default function Home() {

  const contextValue = useContext(ProjectContext);
  if (!contextValue) {
    throw new Error('Context was undefined')
  }
  const [projects] = contextValue;

  return (
    <div className="flex flex-col p-10 w-full mt-10 dark:bg-slate-900">
      {projects.length === 0
        ?
        <div className="p-10 flex flex-col w-full align-middle items-center self-center content-center mt-40">
          <h1 className="font-bold text-3xl border-b-slate-40 text-center select-none dark:text-sky-50">Whoops! <br></br>No Projects Available</h1>
          <Link to='/AddProject'><button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-5 mt-5">Create One?
          </button></Link>
        </div>
        :
        <>
          <h1 className='scroll-m-20 border-b text-3xl font-semibold tracking-normal dark:text-sky-50'>Available Projects</h1>
          <ul className="text-slate-800 p-3">
            {projects.map((project) => {
              return (
                <li key={project.id} className="mt-2 mb-5">
                  <Link to={`/Project?id=${project.id}`} className="font-bold text-xl border-b border-b-slate-400 pr-5 hover:text-slate-600 dark:text-sky-50">{project.name}</Link>
                  <p className="ml-2 pt-2 w-1/3 dark:text-sky-50"><span className="font-semibold">Description:</span> {project.description}</p>
                  {checkOverDue(project)}
                </li>)
            })}
          </ul>
        </>
      }
    </div>
  )
}