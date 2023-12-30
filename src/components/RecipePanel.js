import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react';
import Dialog from './Dialog';
import SearchBar from './SearchBar';
import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export default function RecipePanel(){
  
  const [recipes, setRecipes] = useState([]);
  const [recipeOpen, setRecipeOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState('');
  const [searchInput, setSearchInput] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState("1");

  useEffect(() => {
    if(recipes.length === 0){
      fetchAPI();
    }
  }, [recipes, searchInput])

  const fetchAPI = async () => {
    try {
      const response = await fetch('/api',{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({searchInput, pageNumber})
      });
      const data = await response.clone().json();
      if (response.ok) {
        setRecipes(data.collections);
        // round up the count
        setPageCount(Math.ceil(parseInt(data.count)/12 )-1);
      }else{
        console.log(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handlePageChange = async (e, value) =>{
    setPageNumber(value.toString());
    setRecipes([]);
  }

  const handleRecipeClose = () => {
    setRecipeOpen(false);
  }

  const handleRecipeOpen = (e) =>{
    setSelectedRecipe(e.target.parentElement.id);
    setRecipeOpen(true);
  }

  const handleCleanSearch = async () =>{
    setSearchInput("");
    setRecipes([]);
  }
  return(
      <div className="mx-auto max-w-2xl px-2 py-6 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
      {searchInput && (
        <div>
          <Button className="text-sm text-white font-bold bg-indigo-400 py-1 px-2 rounded-md shadow-md inline-flex items-center" onClick={handleCleanSearch} endIcon={<ClearIcon />}>
            {searchInput}
          </Button>
        </div>
      )}
      <SearchBar searchChange={setSearchInput} recipeChange={setRecipes}/>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {recipes.map((recipe) => (
            <button key={recipe.url} onClick={handleRecipeOpen}
             className="group">
              <div id={recipe.id} className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={recipe.image.replace(/\d+x\d+/,"600x850")}
                  alt={recipe.title}
                  className="h-full w-full object-fill object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="text-center dark:text-slate-50 mt-4 text-sm text-gray-700">{recipe.title}</h3>
            </button>
          ))}
        </div>
        <div className="mt-10 dark:bg-gray-50/90 dark:rounded-md w-fit flex justify-center mx-auto">
          <Pagination
            className="text-md dark:text-white"
            count={pageCount}
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>
        {recipeOpen && (
          <Dialog recipe={selectedRecipe} onClose={handleRecipeClose} state={recipeOpen}/>
        )}
      </div>
  )
}

