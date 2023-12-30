import { useState } from "react"


export default function SearchBar({ searchChange, recipeChange }){

  const [inputOnChange, setInputOnChange] = useState('');

  const handleInputOnChange = (e)=>{
    setInputOnChange(e.target.value);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    let input = e.target.searchInput.value;
    searchChange(input);
    recipeChange([]);
  }

  return(
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <input id="searchInput" class="placeholder:text-slate-400 
                          block bg-white w-full border border-slate-300
                          rounded-md py-2 pl-3 pr-3 shadow-sm my-2 mt-2 mb-5
                          focus:outline-none focus:border-sky-500 focus:ring-sky-500
                          focus:ring-1 sm:text-sm"
          placeholder="Search for anything... (ex: ingredient, category)"
          type="text" value={inputOnChange} onChange={handleInputOnChange} name="search" />
      </form>
    </div>
  )
}