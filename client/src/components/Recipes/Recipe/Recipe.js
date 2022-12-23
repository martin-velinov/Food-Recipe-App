import './Recipe.css';
import LikeRecipe from '../LikeRecipe/LikeRecipe';
import Modal from '../../Modal/Modal';
import utensils from '../../../assets/icons/icon_plate.svg'
import time from '../../../assets/icons/icon_time.svg'
import arrow from '../../../assets/icons/icon_arrows_white.svg'

const RecipeCard = ({ recipeData, setSelectedCard, selectedCard }) => {
  return (
    <>
      <div className='card-wrapper'>
        <div className='card-top'style={{ backgroundImage: `url(${recipeData.recipeImg})` }}>
          <div className='recipe-type'>{recipeData.category}</div>
        </div>

        <div className='card-bottom'>
          <div>
            <h2>{recipeData.recipeTitle}</h2>
            <p>{recipeData.shortDesc}</p>
          </div>

          <div className='card-icons'>
            <div className='card-time'>
              <img src={time} alt="time"/>
              {recipeData.prepTime} min
            </div>

            <div className='card-people' style={{ marginLeft: '10px' }}>
              <img src={utensils} alt="utensils"/>
              {recipeData.numberOfPeople} people
            </div>

            <LikeRecipe
              recipeLikes={recipeData.likes}
              recipeId={recipeData._id}
              className='card-stars'
            />

            <div className='card-button'>
              <button onClick={() => setSelectedCard(recipeData)}>
                <img src={arrow} alt="arrow"/>
              </button>
            </div>
          </div>

        </div>
        
      </div>
      {selectedCard && (
        <Modal selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
      )}
    </>
  );
};

export default RecipeCard;
