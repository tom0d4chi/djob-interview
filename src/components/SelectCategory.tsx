import { SelectCategoryProps } from "../types"

export default function SelectCategory({categories, handleCategoryChange}: SelectCategoryProps){
    return (
        <select name="category" onChange={e => handleCategoryChange(e.target.value)}>
            {categories.map(category => 
                <option key={category} value={category}>
                    {category}
                </option>)}
        </select>
    )
}