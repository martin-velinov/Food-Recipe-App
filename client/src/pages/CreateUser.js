import NewUserForm from '../components/NewUserForm/NewUserForm';
import SectionTitle from '../components/Title/SectionTitle';

const CreateUser = () => {
  return (
    <>
      <SectionTitle title={'Create Account'} />
      <NewUserForm />
    </>
  );
};

export default CreateUser;
