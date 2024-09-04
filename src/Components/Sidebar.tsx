import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../App";
import Switch from '../Switch';

export default function Sidebar() {

    const [theme, setTheme] = useState(localStorage.getItem('theme'))
    const root = window.document.documentElement

    const contextValue = useContext(Context);
    if (!contextValue) {
        throw new Error('Context was undefined')
    }
    const [projects] = contextValue;

    function themeMode() {
        if (localStorage.getItem('theme') === 'light') {
            localStorage.setItem('theme', 'dark')
            setTheme('dark');
        } else {
            localStorage.setItem('theme', 'light')
            setTheme('light');
        }
        console.log(localStorage);
    }

    useEffect(() => {
        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [theme, root.classList])

    return (
        <aside style={{ height: 'calc(100vh - 1.25rem)' }} className="pr-10 pl-10 pt-5 mt-5 bg-slate-800 w-1/6 min-w-80 rounded-tr-3xl">
            {/* <Switch checked={theme === 'dark'} onChange={themeMode} onColor="fff" checkedHandleIcon={<img src="/dark.svg" />} uncheckedHandleIcon={<img src="/light.png" />} /> */}
            <Switch checked={localStorage.getItem('theme') === 'dark'} onCheckedChange={themeMode} />

            <h1 className="text-sky-100 hover:text-white scroll-m-20 pt-10 pb-5 text-3xl font-semibold tracking-tight transition-all uppercase">
                <Link to='/'>Your Projects</Link>
            </h1>

            <Link to='/AddProject'><button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mb-5 mt-5">+ Add Project
            </button></Link>

            <ul className="text-sky-100 p-3">
                {projects.map((project) => {
                    return (
                        <div key={project.id} className="flex gap-3">
                            <li key={project.id}><Link to={`/Project?id=${project.id}`} className="hover:text-white">{project.name}</Link></li>
                            <Link className="text-amber-400 hover:text-amber-300" to={`/EditProject?id=${project.id}`}>Edit</Link>
                        </div>
                    )
                })}
            </ul>
        </aside>
    )
}