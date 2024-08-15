import './index.css'
import Sidebar from './Components/Sidebar'
import Home from './routes/Home'
import AddProject from './routes/AddProject'
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
    { id: 0, name: 'Learning React', description: '', dueDate: '' },
    { id: 1, name: 'Mastering React', description: '', dueDate: '' },
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
            <Route path='addProject' element={<AddProject />} />
          </Routes>
        </div>
      </Context.Provider>
    </Router>
  )
}

export default App
