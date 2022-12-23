import RecipeList from '../components/Recipes/RecipeList/RecipeList';
import SectionTitle from '../components/Title/SectionTitle';

const Breakfast = () => {
  return (
    <>
      <SectionTitle title={'Breakfast'} />
      <RecipeList filterByCategory={'breakfast'} />
    </>
  );
};

export default Breakfast;
