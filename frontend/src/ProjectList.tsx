import { useEffect, useState } from "react";
import {project} from "./types/project"
function ProjectList() {
    const [projects, setProjects] = useState<project[]>([]);
    useEffect(() => {
        const fetchProject = async() => {
            const response = await fetch("https://localhost:5000/api/water/allprojects");
            const data = await response.json();
            setProjects(data);
        };


        fetchProject();
    }, []); //try, if don't work pass in empty array.




    return (
        <>
            <h1>Water Projects</h1>
            {
                projects.map((i) => (
                    <div id="projectCard">
                        <h3>{i.projectName}</h3>
                        <ul>
                            <li>Project Type: {i.projectType}</li>
                            <li>Regional Program: {i.projectRegionalProgram}</li>
                            <li>Impact: {i.projectImpact} peeps served</li>
                            <li>Project Phase: {i.projectPhase}</li>
                            <li>Project Status: {i.projectFunctionalityStatus}</li>
                        </ul>
                    </div>
                ))
            }
            {/* <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Regional Program</th>
                        <th>Impact</th>
                        <th>Phase</th>
                        <th>Functionality Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.map((f) => (
                            <tr key={f.projectId}>
                                <td>{f.projectName}</td>
                                <td>{f.projectType}</td>
                                <td>{f.projectRegionalProgram}</td>
                                <td>{f.projectImpact}</td>
                                <td>{f.projectPhase}</td>
                                <td>{f.projectFunctionalityStatus}</td>
                                projectId: number;
    
                            </tr>
                        ))
                    }
               
                </tbody>
            </table> */}
        </>
    );
}


export default ProjectList;