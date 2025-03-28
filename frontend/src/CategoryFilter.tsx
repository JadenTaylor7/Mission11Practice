import { useEffect, useState } from "react";
import "./CategoryFilter.css";
function CategoryFilter({
    selectedCategories,
    setSelectedCategories,
    }: {
        selectedCategories: string[];
        setSelectedCategories: (categories: string[]) => void;
    }) {
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

    //internal function just to make the checkbox do stuff
    function handleCheckboxChange ({target}: {target: HTMLInputElement}) {
        const updatedCategories = selectedCategories.includes(target.value) ? selectedCategories.filter(x => x !== target.value) : [...selectedCategories, target.value];
        setSelectedCategories(updatedCategories);
    }


    return (
        <div className="category-filter">
            <h4>Project Types</h4>
            <div className="category-list">
                {categories.map((c) => (
                    <div className="category-item" key={c}>
                        <input className="category-checkbox" type="Checkbox" id={c} value={c} onChange={handleCheckboxChange}/>
                        <label className="category-text" htmlFor={c}>{c}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;