import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import Input from '../Input/Input';
import './NewRecipeForm.css';
import { request } from '../../util/request';
import { properties} from "../../config/properties";
import placeholderImg from '../../assets/img/placeholder-img.jpg'

const NewRecipeForm = ({ requestMethod, currentData }) => {
  let { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let img = watch('recipeImg');

  const handleSubmitData = (fData, e) => {
    console.log(fData['recipeImg'][0]);
    const data = new FormData();

    for (const key in fData) {
      if (key === 'recipeImg') {
        data.append(key, fData[key][0]);
      } else {
        data.append(key, fData[key]);
      }
    }
    e.preventDefault();
    request(
      requestMethod,
      `${properties.host.api}/api/v1/recipes/${id}`,
      data,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    navigate(`/my-recipes/${id}`, { replace: true });
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <form
      className='form-style'
      onSubmit={handleSubmit(handleSubmitData, onError)}
    >
      <div className='form-wrapper' >
        <div
          className='new-recipe-left'>
          <div className='image-title'>Recipe Image</div>

          <div className='image-wrapper'>
            <img
              src={
                img === undefined || img === [] || img.length === 0
                  ? `${placeholderImg}`
                  : URL.createObjectURL(img[0])
              }
              alt='recipe_img'
            />
          </div>

          <input
            type='file'
            id='recipeImg'
            style={{ display: 'none' }}
            multiple
            {...register('recipeImg', { required: true })}
          />
          <label htmlFor='recipeImg' className='upload-image-label'>
            UPLOAD IMAGE
          </label>
        </div>
        <div className='new-recipe-middle'>
          <Input
            type='text'
            inputGroupName='title-input'
            label='Recipe Title'
            placeholder='Homemade Pizza'
            name='recipeTitle'
            register={{
              ...register('recipeTitle', { required: true }),
            }}
          />
          {errors.recipeTitle && (
            <span
              style={{
                color: 'red',
                fontFamily: 'Roboto Slab',
                fontWeight: 700,
                fontSize: '12px',
              }}
            >
              This field is required
            </span>
          )}
          <div
            className='middle-container'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div className='meal-category'>
              <label htmlFor='category'>Category</label>
              <select
                id='category'
                {...register('category', { required: true })}
              >
                <option style={{ display: 'none' }}>Select category</option>
                <option value='breakfast'>Breakfast</option>
                <option value='brunch'>Brunch</option>
                <option value='lunch'>Lunch</option>
                <option value='dinner'>Dinner</option>
              </select>
            </div>

            <div >
              <Input
                type='number'
                inputGroupName='prep-time'
                label='Preperation Time'
                placeholder='45'
                name='prepTime'
                register={{
                  ...register('prepTime', { required: true }),
                }}
              />
              {errors.prepTime && errors.prepTime.type === 'required' && (
                <span
                  style={{
                    color: 'red',
                    fontFamily: 'Roboto Slab',
                    fontWeight: 700,
                    fontSize: '12px',
                  }}
                >
                  This field is required
                </span>
              )}
              {console.log(errors.prepTime)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Input
                type='number'
                inputGroupName='people'
                label='No. People'
                placeholder='4'
                name='numberOfPeople'
                register={{
                  ...register('numberOfPeople', { required: true }),
                }}
              />
              {errors.numberOfPeople &&
                errors.numberOfPeople.type === 'required' && (
                  <span
                    style={{
                      color: 'red',
                      fontFamily: 'Roboto Slab',
                      fontWeight: 700,
                      fontSize: '12px',
                    }}
                  >
                    This field is required
                  </span>
                )}
            </div>
          </div>
          <div className='short-description'>
            <label htmlFor='shortDesc'>Short Description</label>
            <textarea
              id='shortDesc'
              placeholder='TLDR of a recipe'
              {...register('shortDesc', { required: true, maxLength: 320 })}
            ></textarea>
            {errors.shortDesc && errors.shortDesc.type === 'maxLength' && (
              <span
                style={{
                  color: 'red',
                  fontFamily: 'Roboto Slab',
                  fontWeight: 700,
                  fontSize: '12px',
                }}
              >
                Max length exceeded (300 characters)
              </span>
            )}
          </div>
        </div>
        <div className='new-recipe-right'>
          <label htmlFor='recipeDesc'>Recipe</label>
          <textarea
            id='recipeDesc'
            placeholder='TLDR of a recipe'
            {...register('recipeDesc', { required: true })}
          ></textarea>
        </div>
      </div>
      <button className='recipe-submit-btn' type='submit'>
        Save
      </button>
    </form>
  );
};

export default NewRecipeForm;