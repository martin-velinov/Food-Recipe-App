import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userLogin';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { properties} from "../config/properties";


const LikeComp = ({ recipeId, className }) => {
  const userState = useSelector(selectUser);
  const [numOfLikes, setNumOfLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    axios
      .get(`${properties.host.api}/api/v1/recipes/${recipeId}`)
      .then((res) => {
        setIsLiked(res.data.recipe.likes.includes(userState.userId));
        setNumOfLikes(res.data.recipe.likes.length);
      });
  }, [numOfLikes, isLiked]);
  const handleLike = () => {
    axios
      .post(
        `${properties.host.api}/api/v1/recipes/likes`,
        {
          userId: userState.userId,
          recipeId: recipeId,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )
      .then((res) => {
        setIsLiked(res.data.like);
        setNumOfLikes(res.data.likeArr.length);
      })
      .catch((err) => alert.error(err.response.statusText));
  };
  return (
    <div className={className}>
      <FontAwesomeIcon
        icon={faStar}
        color={userState.userId && isLiked ? '#f0972a' : 'gray'}
        fontSize={'18px'}
        onClick={handleLike}
      />{' '}
      {numOfLikes}
    </div>
  );
};

export default LikeComp;
