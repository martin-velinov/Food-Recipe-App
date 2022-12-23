import RecipeList from '../components/Recipes/RecipeList/RecipeList';
import SectionTitle from '../components/Title/SectionTitle';

const Brunch = () => {
  return (
    <>
      <SectionTitle title={'Brunch'} />
      <RecipeList filterByCategory={'breakfast'} />
    </>
  );
};

export default Brunch;
