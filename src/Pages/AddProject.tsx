import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize';
import { ProjectContext } from "../project-context";

type Project = {
  id: number,
  name: string,
  desc: string,
  dueDate: string,
  tasks: Tasks[]
}

type Tasks = {
  id: number,
  taskName: string
}


export default function AddProject() {
  const navigate = useNavigate();

  const contextValue = useContext(ProjectContext);
  if (!contextValue) {
    throw new Error('Context was undefined')
  }
  const [projects, setProjects] = contextValue;
  const [newProject, setNewProject] = useState<Project>({
    id: projects.length,
    name: '',
    desc: '',
    dueDate: '',
    tasks: []
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setProjects(prevProject => [
      ...prevProject,
      { id: newProject.id, name: newProject.name, description: newProject.desc, dueDate: newProject.dueDate, tasks: newProject.tasks }
    ])

    navigate('/');
    console.log(newProject);

  }

  return (
    <div className='w-1/3 p-10 mt-10 dark:bg-slate-900'>
      <h1 className='scroll-m-20 border-b text-3xl font-semibold tracking-tight dark:text-sky-50'>Add a new project</h1>

      <form className='' onSubmit={handleSubmit} onReset={() => navigate('/')}>
        <div className="grid gap-6 mb-6 grid-cols-1 mt-7">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-sky-50">Name</label>
            <input
              name="name"
              onChange={handleChange}
              type="text" id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project title" required />
          </div>

          <div>
            <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-sky-50">Description</label>
            <TextareaAutosize
              minRows={5}
              name="desc"
              onChange={handleChange}
              id="desc"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project description" required />
          </div>

          <div>
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-sky-50">Due Date</label>
            <input
              name="dueDate"
              onChange={handleChange}
              type="date" id="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>

        </div>
        <button type="submit" className="text-white bg-blue-950 hover:bg-blue-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save</button>
        <button type="reset" className="text-slate-900 dark:text-sky-50 dark:hover:text-red-500 hover:text-red-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Cancel</button>
      </form>
    </div>
  )
}