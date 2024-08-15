import { useContext, useState } from "react";
import { Context } from "../App"

export default function AddProject() {

  const contextValue = useContext(Context);
  if (!contextValue) {
    throw new Error('Context was undefined')
  }
  const [projects, setProjects] = contextValue;
  const [name, setName] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setProjects(prevProjects => [
      ...prevProjects,
      { id: projects.length, name: name, description: desc, dueDate: dueDate }
    ])
  }

  return (
    <>
      <div className='w-1/3 p-10'>
        <h1 className='scroll-m-20 border-b text-3xl font-semibold tracking-tight'>Add a new project</h1>

        <form className='' onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 grid-cols-1 mt-7">
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-800">Title</label>
              <input
                onChange={(e) => handleChange('title', e)}
                type="text" id="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project title" required />
            </div>

            <div>
              <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-800">Description</label>
              <textarea
                onChange={(e) => handleChange('desc', e)}
                id="desc"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Project description" required />
            </div>

            <div>
              <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-slate-800">Due Date</label>
              <input
                onChange={(e) => handleChange('dueDate', e)}
                type="date" id="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>

          </div>
          <button type="submit" className="text-white bg-blue-950 hover:bg-blue-900 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Save</button>
          <button type="reset" className="text-slate-900  hover:text-red-600 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Cancel</button>
        </form>
      </div>
    </>
  )
}