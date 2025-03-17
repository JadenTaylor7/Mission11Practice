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
                    <div id="projectCard" className="card">
                        <h3 className="card-title">{i.projectName}</h3>
                        <div className="card-body">
                            <ul className="list-unstyled">
                                <li><strong>Project Type:</strong> {i.projectType}</li>
                                <li><strong>Regional Program:</strong> {i.projectRegionalProgram}</li>
                                <li><strong>Impact:</strong> {i.projectImpact} peeps served</li>
                                <li><strong>Project Phase:</strong> {i.projectPhase}</li>
                                <li><strong>Project Status:</strong> {i.projectFunctionalityStatus}</li>
                            </ul>
                        </div>
        
                    </div>
                ))
            }
        </>
    );
}


export default ProjectList;