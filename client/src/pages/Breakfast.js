import CardList from '../components/Cards/CardList/CardList';
import SectionTitle from '../components/Title/SectionTitle';

const Breakfast = () => {
  return (
    <>
      <SectionTitle title={'Breakfast'} />
      <CardList filterByCategory={'breakfast'} />
    </>
  );
};

export default Breakfast;
