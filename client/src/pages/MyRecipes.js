import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../components/Button/Button';
import RecipeTable from '../components/Recipes/RecipeTable/RecipeTable';
import SectionTitle from '../components/Title/SectionTitle';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userLogin';
import axios from 'axios';
import { properties} from "../config/properties";
import plus from '../assets/icons/icon_plus_white.svg'
import '../assets/css/Main.css'


const MyRecipes = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios
      .get(`${properties.host.api}/api/v1/users/${user.userId}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setTableData(res.data.user.recipes);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className='my-recipes'>
      <SectionTitle
        title={'My Recipes'}
        button={
          <Button
            type='add-new-recipe'
            handleClick={() => navigate(`/create-recipe/${user.userId}`)}
            innerText={
              <img src={plus} alt="plus"></img>
            }
          />
        }
      />
      <RecipeTable tableData={tableData} setTableData={setTableData} />
    </div>
  );
};

export default MyRecipes;
