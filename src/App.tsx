import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Sidebar from './Components/Sidebar'
import './index.css'
import AddProject from './Pages/AddProject'
import EditProject from './Pages/EditProject'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import ProjectDetails from './Pages/ProjectDetails'
import ProjectContextProvider from './project-context'


function App() {

  return (
    <Router>
      <ProjectContextProvider>
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
      </ProjectContextProvider>
    </Router>
  )
}

export default App
