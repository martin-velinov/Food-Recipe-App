import RecipeList from '../components/Recipes/RecipeList/RecipeList';
import SectionTitle from '../components/Title/SectionTitle';

const Dinner = () => {
  return (
    <>
      <SectionTitle title={'Dinner'} />
      <RecipeList filterByCategory={'dinner'} />
    </>
  );
};

export default Dinner;
