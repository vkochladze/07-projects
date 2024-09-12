import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

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
interface ProjectContextProviderProps {
    children: ReactNode;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export default function ProjectContextProvider({ children }: ProjectContextProviderProps) {
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
        <ProjectContext.Provider value={[project, setProjects]}>
            {children}
        </ProjectContext.Provider>
    )
}