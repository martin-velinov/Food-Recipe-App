import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import InputComp from './InputComp';
import axios from 'axios';
import './NewRecipeForm/NewRecipeForm.css';
import { properties} from "../config/properties";

const EditRecipe = ({ requestMethod }) => {
  let { recipeId } = useParams();
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
    axios
      .get(`${properties.host.api}/api/v1/recipes/${recipeId}`)
      .then((res) => {
        setInputValues({
          editRecipeTitle: res.data.recipe.recipeTitle,
          editRecipeDesc: res.data.recipe.recipeDesc,
          editCategory: res.data.recipe.category,
          editNumberOfPeople: res.data.recipe.numberOfPeople,
          editPrepTime: res.data.recipe.prepTime,
          editShortDesc: res.data.recipe.shortDesc,
          editRecipeImg: res.data.recipe.recipeImg,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    reset({
      editRecipeTitle: inputValues.recipeTitle,
      editRecipeDesc: inputValues.recipeDesc,
      editCategory: inputValues.category,
      editNumberOfPeople: inputValues.numberOfPeople,
      editPrepTime: inputValues.prepTime,
      editShortDesc: inputValues.shortDesc,
    });
  }, [inputValues]);

  function handleInputChange(e) {
    const value = e.target.value;
    setInputValues((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  let img = watch('editRecipeImg');

  console.log(img);

  const handleSubmitData = (fData, e) => {
    e.preventDefault();
    console.log(fData);
    const data = new FormData();
    console.log(fData['editRecipeImg']);
    data.append('recipeTitle', fData['editRecipeTitle']);
    data.append('recipeImg', fData['editRecipeImg'][0]);
    data.append('recipeDesc', fData['editRecipeDesc']);
    data.append('shortDesc', fData['editShortDesc']);
    data.append('category', fData['editCategory']);
    data.append('numberOfPeople', fData['editNumberOfPeople']);
    data.append('prepTime', fData['editPrepTime']);

    console.log(fData);
    axios
      .patch(`${properties.host.api}/api/v1/recipes/${recipeId}`, data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        alert(res.data.message);
        navigate('/my-recipes');
      })
      .catch((err) => console.log(err.message));
  };

  const onError = (err) => {
    console.log(err);
  };
  return (
    <form
      className='form-style'
      onSubmit={handleSubmit(handleSubmitData, onError)}
    >
      <div className='form-wrapper' style={{ display: 'flex', width: '100%' }}>
        <div
          className='new-recipe-left'
          style={{ display: 'flex', flexDirection: 'column', width: '20%' }}
        >
          <div className='image-title'>Recipe Image</div>

          <div className='image-wrapper'>
            <img
              src={
                img === undefined || img === [] || img.length === 0
                  ? inputValues.editRecipeImg
                  : URL.createObjectURL(img[0])
              }
              alt='recipe_img'
            />
          </div>

          <input
            type='file'
            id='editRecipeImg'
            style={{ display: 'none' }}
            multiple
            {...register('editRecipeImg')}
          />
          <label htmlFor='editRecipeImg' className='upload-image-label'>
            UPLOAD IMAGE
          </label>
        </div>
        <div className='new-recipe-middle'>
          <InputComp
            type='text'
            inputGroupName='title-input'
            label='Recipe Title'
            placeholder='Homemade Pizza'
            name='editRecipeTitle'
            value={inputValues.editRecipeTitle}
            register={{
              ...register('editRecipeTitle', {
                onChange: (e) => handleInputChange(e),
              }),
            }}
          />
          
          <div
            className='middle-container'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div className='meal-category'>
              <label htmlFor='editCategory'>Category</label>
              <select
                id='editCategory'
                value={inputValues.editCategory}
                {...register('editCategory', {
                  onChange: (e) => handleInputChange(e),
                })}
              >
                <option style={{ display: 'none' }}>Select category</option>
                <option value='breakfast'>Breakfast</option>
                <option value='brunch'>Brunch</option>
                <option value='lunch'>Lunch</option>
                <option value='dinner'>Dinner</option>
              </select>
            </div>

            <InputComp
              type='number'
              inputGroupName='prep-time'
              label='Preperation Time'
              placeholder='45'
              name='editPrepTime'
              value={inputValues.editPrepTime}
              register={{
                ...register('editPrepTime', {
                  onChange: (e) => handleInputChange(e),
                }),
              }}
            />
            <InputComp
              type='number'
              inputGroupName='people'
              label='No. People'
              placeholder='4'
              name='editNumberOfPeople'
              value={inputValues.editNumberOfPeople}
              register={{
                ...register('editNumberOfPeople', {
                  onChange: (e) => handleInputChange(e),
                }),
              }}
            />
          </div>
          <div className='short-description'>
            <label htmlFor='shortDesc'>Short Description</label>
            <textarea
              id='shortDesc'
              value={inputValues.editShortDesc}
              placeholder='TLDR of a recipe'
              {...register('editShortDesc', {
                onChange: (e) => handleInputChange(e),
              })}
            ></textarea>
          </div>
        </div>
        <div className='new-recipe-right'>
          <label htmlFor='recipeDesc'>Recipe</label>
          <textarea
            id='recipeDesc'
            value={inputValues.editRecipeDesc}
            placeholder='TLDR of a recipe'
            {...register('editRecipeDesc', {
              onChange: (e) => handleInputChange(e),
            })}
          ></textarea>
        </div>
      </div>
      <button className='recipe-submit-btn' type='submit'>
        Update
      </button>
    </form>
  );
};

export default EditRecipe;
