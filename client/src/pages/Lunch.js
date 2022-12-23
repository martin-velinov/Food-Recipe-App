import RecipeList from '../components/Recipes/RecipeList/RecipeList';
import SectionTitle from '../components/Title/SectionTitle';

const Lunch = () => {
  return (
    <>
      <SectionTitle title={'Lunch'} />
      <RecipeList filterByCategory={'lunch'} />
    </>
  );
};

export default Lunch;
