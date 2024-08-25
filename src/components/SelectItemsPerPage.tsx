import { SelectItemsPerPageProps } from "../types"

export default function SelectItemsPerPage({setItemsPerPage}: SelectItemsPerPageProps){
    return(
        <div className="text-white flex flex-row items-center gap-2">
            <div className="rounded-full h-11 my-4 border-[#636363] border-[1px] px-4">
                <select className="rounded-full focus:outline-[0px] h-full px-4 w-full bg-[#1e1e1e] border-0  text-white pl-0" name="category" 
                        onChange={e =>setItemsPerPage(Number(e.target.value) as 4 | 8 | 12)}>
                    <option value={4}>4</option>
                    <option value={8}>8</option>
                    <option value={12}>12</option>
                </select>
            </div>
                films par page
        </div>
    )
}