import { useEffect, useState } from "react";
import "./CategoryFilter.css";
function CategoryFilter() {
    const [categories, setCategories] = useState<string[]>([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://localhost:5000/api/Water/GetProjectTypes");
                const data = await response.json();
                
                console.log('Fetched the following categories: ', data)
                setCategories(data);
            }
            catch (error) {
                console.error('You done messe up', error);
            }

        };

        fetchCategories();
    }, []);
    return (
        <div className="category-filter">
            <h4>Project Types</h4>
            <div className="category-list">
                {categories.map((c) => (
                    <div className="category-item" key={c}>
                        <input className="category-checkbox" type="Checkbox" id={c} value={c}/>
                        <label htmlFor={c}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;