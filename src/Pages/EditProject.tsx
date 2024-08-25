import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TextareaAutosize from 'react-textarea-autosize';
import { Context } from "../App";

const editCSS = 'text-slate-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
const saveCSS = 'text-white bg-blue-950 hover:bg-blue-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'

type Project = {
  id: number,
  name: string,
  desc: string,
  dueDate: string
}

export default function EditProject() {
  const navigate = useNavigate()

  const contextValue = useContext(Context);
  if (!contextValue) {
    throw new Error('Context was undefined')
  }
  const [projects, setProjects] = contextValue;
  const [isEditing, setIsEditing] = useState(false);

  const [idParam] = useSearchParams({ id: "" })
  const projectIDValue = idParam.get("id");
  const projectID = projectIDValue ? parseInt(projectIDValue) : -1;
  const currProject = projects?.filter((s) => s.id === projectID)
  const currentProject = currProject[0]
  const [editedProject, setEditedProject] = useState<Project>({
    id: projects.length,
    name: '',
    desc: '',
    dueDate: ''
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameRef.current && descRef.current && dueDateRef.current) {
      nameRef.current.value = currentProject.name;
      descRef.current.value = currentProject.description;
      dueDateRef.current.value = currentProject.dueDate;
    }

    if (!currentProject) { navigate('*') }
  }, [currentProject, currentProject?.description, currentProject?.dueDate, currentProject?.name, navigate, projectIDValue]) // if anything breaks check here

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setEditedProject({
      ...editedProject,
      [e.target.name]: e.target.value
    })
  }

  function updatedProject() {
    setProjects(projects.map(project =>
      project.id === projectID ? { ...project, name: editedProject.name ? editedProject.name : currentProject.name, description: editedProject.desc ? editedProject.desc : currentProject.description, dueDate: editedProject.dueDate ? editedProject.dueDate : currentProject.dueDate } : project,
    ))
    console.log('updatedProjectDueDate');
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsEditing(isEditing => !isEditing)

    if (!isEditing) {
      setEditedProject({
        ...editedProject,
        id: projectID,
        name: currentProject.name,
        desc: currentProject.description,
        dueDate: currentProject.dueDate
      });
    }

    if (isEditing) {
      if (editedProject.name && editedProject.name != currentProject.name) { updatedProject() }
      if (editedProject.desc && editedProject.desc != currentProject.description) { updatedProject() }
      if (editedProject.dueDate && editedProject.dueDate != currentProject.dueDate) { updatedProject() }
    }
  }

  function handleReset() {
    if (isEditing) {
      setIsEditing(isEditing => !isEditing)
      setEditedProject({
        ...editedProject,
        id: projectID,
        name: currentProject.name,
        desc: currentProject.description,
        dueDate: currentProject.dueDate
      });
    }
  }

  return (
    <>
      {currentProject && (
        <div className='w-1/3 p-10 mt-10'>
          <h1 className='scroll-m-20 border-b text-3xl font-semibold tracking-tight'>Editing Project: {currentProject.name}</h1>

          <form className='' onSubmit={handleSubmit} onReset={handleReset}>
            <div className="grid gap-6 mb-6 grid-cols-1 mt-7">

              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-800">Title</label>
                <input
                  name="name"
                  value={editedProject.name}
                  onChange={handleChange}
                  type="text" id="name"
                  disabled={!isEditing}
                  ref={nameRef}
                  className="disabled:text-slate-200 disabled:opacity-75  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project title" required />
              </div>

              <div>
                <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-800">Description</label>

                <TextareaAutosize
                  minRows={5}
                  name="desc"
                  value={editedProject.desc}
                  onChange={handleChange}
                  id="desc" disabled={!isEditing}
                  ref={descRef}
                  className="disabled:text-slate-200 disabled:opacity-75 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project description" required />
              </div>

              <div>
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-800">Due Date</label>
                <input
                  name="due-date"
                  value={editedProject.dueDate}
                  onChange={handleChange}
                  type="date" id="date"
                  disabled={!isEditing}
                  ref={dueDateRef}
                  className="disabled:text-slate-200 disabled:opacity-75 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>

            </div>
            <button type="submit" className={isEditing ? saveCSS : editCSS}>{isEditing ? 'Save' : 'Edit'}</button>
            {isEditing && <button type="reset" className="text-red-600  hover:text-red-400 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Cancel</button>}
          </form>
        </div>
      )}

    </>
  )
}