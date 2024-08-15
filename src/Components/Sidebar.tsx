import { Link } from "react-router-dom";
import { Context } from "../App";
import { useContext } from "react";


export default function Sidebar() {
    const contextValue = useContext(Context);
    if (!contextValue) {
        throw new Error('Context was undefined')
    }
    const [projects] = contextValue;

    return (
        <aside className="p-10 bg-slate-800 h-screen w-1/6">
            <h1 className="text-sky-100 hover:text-white scroll-m-20 pt-10 pb-5 text-3xl font-semibold tracking-tight transition-all uppercase">
                <Link to='/'>Your Projects</Link>
            </h1>

            <Link to='/AddProject'><button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-5 mt-5">+ Add Project
            </button></Link>

            <ul className="text-sky-100 p-3">
                {projects.map((project) => {
                    return (
                        <div key={project.id} className="flex gap-3">
                            <li key={project.id}>{project.name}</li>
                            <Link className="text-amber-400 hover:text-amber-300" to={`/EditProject?id=${project.id}`}>Edit</Link>
                        </div>
                    )
                })}
            </ul>
        </aside>
    )
}