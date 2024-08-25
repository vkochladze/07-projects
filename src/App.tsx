import { createContext, Dispatch, SetStateAction, useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Sidebar from './Components/Sidebar'
import './index.css'
import AddProject from './Pages/AddProject'
import EditProject from './Pages/EditProject'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import ProjectDetails from './Pages/ProjectDetails'

type ProjectContextType = [Project[], Dispatch<SetStateAction<Project[]>>];
type Project = {
  id: number,
  name: string,
  description: string,
  dueDate: string,
  tasks: Tasks[]
}

type Tasks = {
  id: number,
  taskName: string
}


export const Context = createContext<ProjectContextType | undefined>(undefined);

function App() {
  // const [project, setProjects] = useState([
  //   {
  //     id: 0, name: 'Learning React', description: 'Learning React from the ground up', dueDate: '2024-03-02', tasks: [
  //       { id: 0, taskName: 'Task 1' },
  //       { id: 1, taskName: 'Task 2' }
  //     ]
  //   },
  //   {
  //     id: 1, name: 'Mastering React', description: 'Mastering React Description', dueDate: '2024-02-01', tasks: [
  //       { id: 0, taskName: 'Task 3' },
  //       { id: 1, taskName: 'Task 4' }
  //     ]
  //   },
  // ]);

  const [project, setProjects] = useState<Project[]>([]);

  return (
    <Router>
      <Context.Provider value={[project, setProjects]}>
        <div className='flex'>
          <Sidebar />
          <Routes>
            <Route index element={<Home />} />
            <Route path='/' element={<Home />} />
            <Route path='AddProject' element={<AddProject />} />
            <Route path='EditProject' element={<EditProject />} />
            <Route path='Project' element={<ProjectDetails />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </Context.Provider>
    </Router>
  )
}

export default App
