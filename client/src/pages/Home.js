import RecipeList from '../components/Recipes/RecipeList/RecipeList';
import SectionTitle from '../components/Title/SectionTitle';

const Home = () => {
  return (
    <>
      <SectionTitle title={'Fresh & New'} />
      <RecipeList filterByCategory={'new'} />
      <SectionTitle title={'Most Popular Recipes'} />
      <RecipeList filterByCategory={'popular'} />
    </>
  );
};

export default Home;
