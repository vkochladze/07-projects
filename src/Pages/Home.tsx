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
    <div className="p-10">
      <h1 className='scroll-m-20 border-b text-3xl font-semibold tracking-normal'>Available Projects</h1>

      <ul className="text-slate-800 p-3">
        {projects.map((project) => {
          return (
            <li key={project.id} className="mt-2">
              <Link to={`/EditProject?id=${project.id}`} className="font-bold text-xl border-b border-b-slate-400 pr-5">{project.name}</Link>
              <p className="ml-2"><span className="font-semibold">Description:</span> {project.description}</p>
              <p className="ml-2"><span className="font-semibold">Due by:</span> {project.dueDate}</p>
            </li>)
        })}
      </ul>
    </div>
  )
}