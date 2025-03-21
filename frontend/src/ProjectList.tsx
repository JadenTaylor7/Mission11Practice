import { useEffect, useState } from "react";
import {project} from "./types/project"
function ProjectList() {
    const [projects, setProjects] = useState<project[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    useEffect(() => {
        const fetchProject = async() => {
            // const response = await fetch(`https://localhost:5000/api/water/allprojects?pageSize=${pageSize}&pageNumber=${pageNumber}`, {
            //     credentials: 'include',
            // });
            const response = await fetch(`https://localhost:5000/api/water/allprojects?pageSize=${pageSize}&pageNumber=${pageNumber}`);
            const data = await response.json();
            setProjects(data.projectList); //this has to be a lowercase p to match what gets returned
            setTotalItems(data.totalNumberProjects);
            setTotalPages(Math.ceil(totalItems / pageSize));
        };


        fetchProject();
    }, [pageSize, pageNumber, totalItems]); //try, if don't work pass in empty array.




    return (
        <>
            <h1>Water Projects</h1>
            {
                projects?.map((i) => (
                    <div id="projectCard" className="card" key={i.projectId}>
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
            <br/>

            <button disabled={pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)}>Previous</button>

            {/* dynamically create number of pages needed */}
            {
                [...Array(totalPages)].map((_, i) => (
                    <button key={i + 1} onClick={() => setPageNumber(i + 1)}>
                        {i + 1}
                    </button>
                ))
            }

            <button disabled={pageNumber === totalPages} onClick={() => setPageNumber(pageNumber + 1)}>Next</button>
         
            <br/>
            <label>
                Results per page:
                <select value={pageSize} onChange={(i) => setPageSize(Number(i.target.value))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </label>
        </>
    );
}


export default ProjectList;