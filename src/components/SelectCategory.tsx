import { SelectCategoryProps } from "../types"

export default function SelectCategory({categories, handleCategoryChange}: SelectCategoryProps){
    return (
        <div className="rounded-full h-11 my-4 border-[#636363] border-[1px] w-72 px-4">
        <select className="h-full px-4 w-full bg-[#1e1e1e] border-0  text-white pl-0" name="category" onChange={e => handleCategoryChange(e.target.value)}>
            {categories.map(category => 
                <option key={category} value={category}>
                    {category}
                </option>)}
        </select>
        </div>
    )
}