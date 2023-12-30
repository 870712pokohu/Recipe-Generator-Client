import { useEffect, useState } from "react";
import Dialog from "./Dialog";

export default function RecipeGenerator(){

  const [categoryValue, setCategoryValue] = useState("");
  const [randomRecipe, setRandomRecipe] = useState([]);
  const [recipeOpen, setRecipeOpen] = useState(false);


  useEffect(()=>{
    fetchAPI();
  },[])

  const fetchAPI = async() =>{
    const response = await fetch('/api/random',{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryValue)
    });
    const data = await response.clone().json();
    if(response.ok){
      setRandomRecipe(data[0]);
    }
  };

  const handleRecipeShuffle = async() =>{
    try {
      await fetchAPI();
    } catch (error) {
      console.log(error)
    }
  }

  const handleRecipeClose = () => {
    setRecipeOpen(false);
  }

  const handleViewDetail = (e) =>{
    setRecipeOpen(true);
  };

  const handleSelectChange = (e) =>{
    setCategoryValue(e.target.value);
  }
  if(randomRecipe){
      return(
        <div>   
          <div className="mt-10 max-w-lg mx-auto bg-slate-50 rounded-2xl shadow-lg -hidden md:max-w-2xl">
            <div class="md:flex">
              <div class="md:shrink-0">
                <img class="opacity-95 h-48 w-full object-contain md:h-full md:w-60 rounded-l-lg" src={randomRecipe.image} alt={randomRecipe.title} />
              </div>
              <div className="md:w-full mr-3 flex flex-col ">
                <div className="pl-4 pt-3 flex justify-end flex-row">
                  <div className="mr-5 shadow-sm">
                    <select value={categoryValue} className="bg-gray-100 rounded-md p-2 self-center" onChange={handleSelectChange}>
                      <option value="">Category</option>
                      <option value="Dinner">Dinner</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Snack">Snack</option>
                    </select>
                  </div>
                  <button className="hover:text-white hover:bg-indigo-400 bg-indigo-200 w-fit h-fit rounded-md px-4 text-md shadow-sm font-semibold self-center py-1 mr-3" onClick={handleRecipeShuffle}>
                    Shuffle
                  </button>
                </div>
                <div class="pt-5 pl-8 pb-5">
                  <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">recipe inspiration!</div>
                  <a href={randomRecipe.url} class="block mt-1 text-lg leading-tight font-medium text-black hover:underline" target="_blank">{randomRecipe.title}</a>
                  <ul class="mt-4 *:text-sm *:mr-3 *:w-fit *:mb-3 *:p-2 *:px-3 font-medium *:rounded-md *:bg-indigo-100 flex flex-wrap ">
                    {randomRecipe.timeSet && randomRecipe.timeSet.map((time) => (
                      <li key={time} >{time}</li>
                    ))}
                  </ul>
                  <button className="ml-1 uppercase tracking-wide text-sm text-indigo-500 font-semibold hover:underline" onClick={handleViewDetail}>For More Detail</button>
                </div>
              </div>
            </div>
          </div>
          <Dialog recipe={randomRecipe.id} onClose={handleRecipeClose} state={recipeOpen} />
        </div>
      )

  }
}