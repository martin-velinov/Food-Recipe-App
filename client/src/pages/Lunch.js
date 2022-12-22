import CardList from '../components/Cards/CardList/CardList';
import SectionTitle from '../components/Title/SectionTitle';

const Lunch = () => {
  return (
    <>
      <SectionTitle title={'Lunch'} />
      <CardList filterByCategory={'lunch'} />
    </>
  );
};

export default Lunch;
