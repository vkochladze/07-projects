import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../App";

export default function Home() {

  const contextValue = useContext(Context);
  if (!contextValue) {
    throw new Error('Context was undefined')
  }
  const [projects] = contextValue;

  return (
    <div className="flex flex-col p-10 w-full mt-10">
      {projects.length === 0
        ?
        <div className="p-10 flex flex-col w-full align-middle items-center self-center content-center mt-40">
          <h1 className="font-bold text-3xl border-b-slate-40 text-center select-none">Whoops! <br></br>No Projects Available</h1>
          <Link to='/AddProject'><button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-5 mt-5">Create One?
          </button></Link>
        </div>
        :
        <>
          <h1 className='scroll-m-20 border-b text-3xl font-semibold tracking-normal'>Available Projects</h1>
          <ul className="text-slate-800 p-3">
            {projects.map((project) => {
              return (
                <li key={project.id} className="mt-2 mb-5">
                  <Link to={`/Project?id=${project.id}`} className="font-bold text-xl border-b border-b-slate-400 pr-5 hover:text-slate-600">{project.name}</Link>
                  <p className="ml-2 pt-2 w-1/3"><span className="font-semibold">Description:</span> {project.description}</p>
                  <p className="ml-2 pt-2"><span className="font-semibold">Due by:</span> {project.dueDate}</p>
                </li>)
            })}
          </ul>
        </>
      }

    </div>
  )
}