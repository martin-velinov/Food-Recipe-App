import { useEffect, useState } from 'react';
import Recipe from '../Recipe/Recipe';
import axios from 'axios';
import { properties} from "../../../config/properties";
import './RecipeList.css'

const RecipeList = ({ filterByCategory }) => {
  const [recipesList, setRecipesList] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);


  useEffect(() => {
    if (filterByCategory === 'new') {
      axios.get(`${properties.host.api}/api/v1/recipes/${filterByCategory}/`)
        .then((res) => {setRecipesList(res.data.recipes);})
        .catch(function (error) {console.log(error);});

    } else if (filterByCategory === 'popular') {
      axios.get(`${properties.host.api}/api/v1/recipes/${filterByCategory}/`)
        .then((res) => {setRecipesList(res.data.recipes);})
        .catch(function (error) {console.log(error);});

    } else {
      axios.get(`${properties.host.api}/api/v1/recipes/${filterByCategory}/`)
        .then((res) => {setRecipesList(res.data.recipes);})
        .catch(function (error) {console.log(error);});
    }
  }, [ filterByCategory]);

  return (
    <>
      <div className='card-list'>
        {recipesList.map((recipe) => (
          <Recipe
            key={recipe._id}
            recipeData={recipe}
            setSelectedCard={setSelectedCard}
            selectedCard={selectedCard}
            setRecipesList={setRecipesList}
          />
        ))}
      </div>
      
    </>
  );
};

export default RecipeList;
