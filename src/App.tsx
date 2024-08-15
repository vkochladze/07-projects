import './index.css'
import Sidebar from './Components/Sidebar'
import Home from './Pages/Home'
import AddProject from './Pages/AddProject'
import EditProject from './Pages/EditProject'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react'

type ProjectContextType = [Project[], Dispatch<SetStateAction<Project[]>>];
type Project = {
  id: number,
  name: string,
  description: string,
  dueDate: string,
}


export const Context = createContext<ProjectContextType | undefined>(undefined);

function App() {
  const [project, setProjects] = useState([
    { id: 0, name: 'Learning React', description: 'Learning React Description', dueDate: '2024-03-02' },
    { id: 1, name: 'Mastering React', description: 'Mastering React Description', dueDate: '2024-02-01' },
  ]);


  useEffect(() => {
    console.log(project);
  }, [project])

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
          </Routes>
        </div>
      </Context.Provider>
    </Router>
  )
}

export default App
