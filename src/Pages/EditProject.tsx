import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../App"
import { useSearchParams } from "react-router-dom";

const editCSS = 'text-slate-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
const saveCSS = 'text-white bg-blue-950 hover:bg-blue-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'

export default function EditProject() {

  const contextValue = useContext(Context);
  if (!contextValue) {
    throw new Error('Context was undefined')
  }
  const [projects, setProjects] = contextValue;

  const [isEditing, setIsEditing] = useState(false);

  const [idParam] = useSearchParams({ id: "" })
  const projectIDValue = idParam.get("id");
  const projectID = projectIDValue ? parseInt(projectIDValue) : -1;
  const currProject = projects.filter((s) => s.id === projectID)
  const currentProject = currProject[0]

  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameRef.current && descRef.current && dueDateRef.current) {
      nameRef.current.value = currentProject.name;
      descRef.current.value = currentProject.description;
      dueDateRef.current.value = currentProject.dueDate;
    }
  }, [projectIDValue])

  function handleChange(inputName: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const inputText = event.target.value;
    if (inputName === "title") {
      setName(inputText);
    }
    if (inputName === "desc") {
      setDesc(inputText);
    }
    if (inputName === "dueDate") {
      setDueDate(inputText);
    }
  }

  // function updatedProjectName() {
  //   setProjects(projects.map(project =>
  //     project.id === projectID ? { ...project, name: name } : project,
  //   ))
  //   console.log('updatedProjectName');
  // }

  // function updatedProjectDesc() {
  //   setProjects(projects.map(project =>
  //     project.id === projectID ? { ...project, description: desc } : project,
  //   ))
  //   console.log('updatedProjectDesc');
  // }

  // function updatedProjectDueDate() {
  //   setProjects(projects.map(project =>
  //     project.id === projectID ? { ...project, dueDate: dueDate } : project,
  //   ))
  //   console.log('updatedProjectDueDate');
  // }

  function updatedProject() {
    setProjects(projects.map(project =>
      project.id === projectID ? { ...project, name: name ? name : currentProject.name, description: desc ? desc : currentProject.description, dueDate: dueDate ? dueDate : currentProject.dueDate } : project,
    ))
    console.log('updatedProjectDueDate');
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsEditing(isEditing => !isEditing)

    if (!isEditing) {
      setName(currentProject.name);
      setDesc(currentProject.description);
      setDueDate(currentProject.dueDate)
    }

    if (isEditing) {
      if (name && name != currentProject.name) { updatedProject() }
      if (desc && desc != currentProject.description) { updatedProject() }
      if (dueDate && dueDate != currentProject.dueDate) { updatedProject() }
    }
  }

  function handleReset() {
    if (isEditing) {
      setIsEditing(isEditing => !isEditing)
    }
  }

  return (
    <>
      <div className='w-1/3 p-10'>
        <h1 className='scroll-m-20 border-b text-3xl font-semibold tracking-tight'>Add a new project</h1>

        <form className='' onSubmit={handleSubmit} onReset={handleReset}>
          <div className="grid gap-6 mb-6 grid-cols-1 mt-7">

            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-800">Title</label>
              <input
                value={name}
                onChange={(e) => handleChange('title', e)}
                type="text" id="name"
                disabled={!isEditing}
                ref={nameRef}
                className="disabled:text-slate-200 disabled:opacity-75  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project title" required />
            </div>

            <div>
              <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-800">Description</label>
              <textarea
                value={!desc ? currentProject.description : desc}
                onChange={(e) => handleChange('desc', e)}
                id="desc" disabled={!isEditing}
                ref={descRef}
                className="disabled:text-slate-200 disabled:opacity-75 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project description" required />
            </div>

            <div>
              <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-800">Due Date</label>
              <input
                value={!dueDate ? currentProject.dueDate : dueDate}
                onChange={(e) => handleChange('dueDate', e)}
                type="date" id="date"
                disabled={!isEditing}
                ref={dueDateRef}
                className="disabled:text-slate-200 disabled:opacity-75 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

          </div>
          <button type="submit" className={isEditing ? saveCSS : editCSS}>{isEditing ? 'Save' : 'Edit'}</button>
          <button type="reset" className="text-slate-900  hover:text-red-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Cancel</button>
        </form>
      </div>
    </>
  )
}