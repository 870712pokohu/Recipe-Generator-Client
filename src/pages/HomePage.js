
import RecipeGenerator from "../components/RecipeGenerator";
import RecipePanel from "../components/RecipePanel";

export default function HomePage(){
  return(
      <div className="dark:bg-slate-800">
        <RecipeGenerator/>
        <div class="container mx-auto">
          <RecipePanel/>
        </div>
      </div>
  )
}