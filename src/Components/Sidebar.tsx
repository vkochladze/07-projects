import { Link } from "@tanstack/react-router";
import { useState } from "react";

export default function Sidebar() {
    const [projects, setProjects] = useState([
        { title: '', description: '', dueDate: '' }
    ])

    return (
        <aside className="p-10 bg-slate-800 h-screen w-1/6">
            <h1 className="text-sky-100 scroll-m-20 pt-10 pb-5 text-3xl font-semibold tracking-tight uppercase">
                <Link to='/'>
                    Your Projects
                </Link>
            </h1>


            <Link to='/AddProject'><button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-5 mt-5">+ Add Project
            </button></Link>

            <ul className="text-sky-100 p-3">
                <li>Learning React</li>
                <li>Mastering React</li>
            </ul>
        </aside>
    )
}