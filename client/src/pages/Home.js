import CardList from '../components/Cards/CardList/CardList';
import SectionTitle from '../components/Title/SectionTitle';

const Home = () => {
  return (
    <>
      <SectionTitle title={'Fresh & New'} />
      <CardList filterByCategory={'new'} />
      <SectionTitle title={'Most Popular Recipes'} />
      <CardList filterByCategory={'popular'} />
    </>
  );
};

export default Home;
