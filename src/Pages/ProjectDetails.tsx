import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Context } from "../App";

export default function ProjectDetails() {

  const navigate = useNavigate();
  const contextValue = useContext(Context);
  if (!contextValue) {
    throw new Error('Context was undefined')
  }
  const [projects, setProjects] = contextValue;
  const [task, setTask] = useState('');

  const [idParam] = useSearchParams({ id: "" })
  const projectIDValue = idParam.get("id");
  const projectID = projectIDValue ? parseInt(projectIDValue) : -1;
  const currProject = projects.filter((s) => s.id === projectID)
  const currentProject = currProject[0]

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTask(e.target.value)
  }

  function addTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (task) {
      setProjects(prevProjects =>
        prevProjects.map(project =>
          project.id === currentProject.id ? { ...project, tasks: [...project.tasks, { id: project.tasks.length, taskName: task }] } : project
        )
      )
      setTask('')
    }
  }

  function clearTask(taskID: number) {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === currentProject.id ? { ...project, tasks: project.tasks.filter(task => task.id !== taskID) } : project
      )
    )
  }

  function deleteProject() {
    setProjects(prevProjects =>
      prevProjects.filter(project => project.id != currentProject.id)
    )
    navigate('/')
  }

  return (
    <>
      <div className='w-1/3 p-10 mt-10'>
        <div className="border-b pb-5">
          <div className="flex justify-between border-b">
            <h1 className='scroll-m-20 text-3xl font-semibold tracking-tight dark:text-sky-50'>Project details: {currentProject.name}</h1>
            <button onClick={deleteProject} className="text-red-600 hover:text-red-500">Delete</button>
          </div>
          <div className="ml-2 pb-2">
            <p className="pt-2 text-base text-slate-500">{currentProject.dueDate}</p>
            <p className="pt-4 dark:text-sky-50">{currentProject.description}</p>
          </div>
        </div>

        <div>
          <h1 className='pt-5 scroll-m-20 text-3xl font-semibold tracking-tight dark:text-sky-50'>Tasks</h1>
          <div className="flex gap-5 pt-5 pb-5">
            <form action="" onSubmit={addTask} className="flex w-full gap-4">
              <input placeholder="Enter task name..." value={task} onChange={handleChange} className="bg-slate-700 h-9 w-2/4 rounded-md shadow-sm p-3 text-sm text-sky-100" type="text" name="add-task" id="add-task" required />
              <button type="submit" className="hover:text-slate-700 dark:text-sky-50">Add Task</button>
            </form>
          </div>
          <div className="w-100 bg-slate-700 rounded-md p-4 text-sky-100">
            <ul className="flex flex-col justify-between">
              {currentProject.tasks.length === 0 && <p className="text-gray-400 cursor-default select-none">No tasks in this project. Use the form above to add one!</p>}
              {currentProject.tasks.map((task) => {
                return (
                  <div key={task.id} className="flex justify-between pt-3 pb-3">
                    <li>{task.taskName}</li>
                    <button onClick={() => clearTask(task.id)} className="hover:text-red-300">Clear</button>
                  </div>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}