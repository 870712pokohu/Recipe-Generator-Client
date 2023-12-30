import { useEffect, useState } from "react";

export default function Dialog({ recipe, onClose, state }){

  const [singleRecipe, setSingleRecipe] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const handleOnClose = (e) =>{
    if (e.target.id === "container" || e.target.id === "exit"){
      onClose();
    }
  };

  useEffect (()=>{
    const fetchRecipeDetail = async ()=>{
      const api = '/api/' + recipe;
      const response = await fetch(api);
      if(response.ok){
        const data = await response.json();
        setSingleRecipe(data.singleRecipe);
        setKeywords(data.keywordCollection);
      }
    };
    if(recipe){
      fetchRecipeDetail();
    }
  },[recipe]);
  
  if(state && singleRecipe){

    let keywordSet = keywords.map((single)=>{
      return single.keyword
    })

    if(singleRecipe[0] && keywordSet){
      return(
        <div
          id = "container"
          onClick={handleOnClose}
          class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center overflow-auto"
        >
          <div className="bg-white dark:bg-slate-800 w-2/3 h-2/3 max-h-fit rounded-xl shadow-md p-6 overflow-y-scroll">
            <div className="flex flex-row-reverse">
              <button onClick={handleOnClose} id="exit" className="font-bold dark:text-indigo-100 hover:text-lg text-indigo-700 text-md" >X</button>
            </div>
            <div className="px-4 sm:px-0">
              <h2 className="text-xl font-semibold dark:text-indigo-100 leading-7 text-indigo-700 mb-3">{singleRecipe[0].title}</h2>
              <ul className="*:text-sm *:mb-2 *:p-1 *:px-2 *:rounded-md  *:bg-slate-200 flex flex-wrap *:shadow-sm *:mr-2">
                {keywordSet && keywordSet.map((keyword)=>(
                  <li className="hover:bg-indigo-100" key={keyword}>
                    {keyword}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-2 border-t border-gray-200">
              <dl className="divide-y divide-gray-200">
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-md dark:text-slate-50 font-medium leading-6 text-gray-900">TimeSet</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <ul class="*:text-md *:mr-3 *:mb-2 *:p-2 *:px-3 font-medium *:rounded-md *:bg-indigo-100 flex flex-wrap ">
                      {singleRecipe[0].timeSet && singleRecipe[0].timeSet.map((time)=>(
                        <li key={time} >{time}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-md dark:text-slate-50 font-medium leading-6 text-gray-900">Ingredients</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <ul className="list-disc *:pl-3 *:text-sm marker:text-indigo-400 dark:text-slate-50 text-slate-500 *:mb-1">
                      {singleRecipe[0].ingredient && singleRecipe[0].ingredient.map((detail)=>(
                       <li key={detail} >{detail}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-md dark:text-slate-50 font-medium leading-6 text-gray-900">Instructions</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <ul className="list-disc *:pl-3 text-slate-500 dark:text-slate-50  marker:text-indigo-400 *:mb-1 *:text-sm">
                      {singleRecipe[0].instruction && singleRecipe[0].instruction.length > 0 ? singleRecipe[0].instruction.map((detail)=>(
                        <li key={detail} >{detail}</li>
                      )):(<div>no instruction</div>)}
                    </ul>
                  </dd>
                </div>
                <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-md font-medium leading-6 text-gray-900 dark:text-slate-50">About</dt>
                  <dd className="sm:col-span-2 sm:mt-0">
                    <a className="font-medium pl-4 leading-6 text-sm text-indigo-500 hover:underline" href={singleRecipe[0].url}>{singleRecipe[0].url}</a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )
    }
  }else{
    return null
  }
}