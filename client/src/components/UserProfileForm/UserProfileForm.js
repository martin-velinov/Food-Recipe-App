import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { logout } from '../../redux/slices/userLogin';
import 'react-datepicker/dist/react-datepicker.css';
import './UserProfileForm.css';
import { properties} from "../../config/properties";

const UserProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [addUserFormData, setAddUserFormData] = useState({
    firstName: '',
    lastName: '',
    birthday: moment().toDate(),
    email: '',
    image: '',
  });

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: addUserFormData,
  });

  let img = watch('file');

  useEffect(() => {
    axios
      .get(`${properties.host.api}/api/v1/users/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        setAddUserFormData({ ...res.data.user, password: '' });
      })
      .catch((err) => {
        alert('Error ' + err);
        dispatch(
          logout({
            userId: '',
            isLoggedIn: false,
          })
        );
        navigate('/', { replace: true });
      });
  }, []);

  useEffect(() => {
    reset(addUserFormData);
  }, [addUserFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddUserFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmitData = (fData, e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('firstName', fData['firstName']);
    data.append('image', fData['file'][0]);
    data.append('lastName', fData['lastName']);
    data.append('birthday', fData['birthday']);
    data.append('email', fData['email']);
    data.append('password', fData['password']);

    axios
      .patch(`${properties.host.api}/api/v1/users/${id}`, data, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.message));
    alert('User updated!');
  };

  const onError = (err) => {
    console.log(err);
  };

  return (
    <div className='userProfileWrapper'>
      <form
        className='userProfileForm'
        onSubmit={handleSubmit(handleSubmitData, onError)}
      >
        <div className='userProfilePicture'>
          <div className='editImageWrapper'>
            <img
              src={
                img === undefined || img === [] || img.length === 0
                  ? addUserFormData.image
                  : URL.createObjectURL(img[0])
              }
              alt='profile_picture'
            />
          </div>
          <input
            type='file'
            id='file'
            style={{ display: 'none' }}
            multiple
            {...register('file')}
          />
          <label htmlFor='file' className='imageLabel'>
            CHANGE AVATAR
          </label>
        </div>
        <div className='allInputs'>
          <div className='formDefaultInputContainer'>
            <label htmlFor='firstName' className='formDefaultLabel'>
              First Name
            </label>
            <input
              id='firstName'
              placeholder='John'
              defaultValue={addUserFormData.firstName}
              className='formDefaultInput'
              {...register('firstName', {
                onChange: (e) => handleInputChange(e),
              })}
            />
            {errors.firstName && (
              <span className='invalidInput'>
                This field is required
              </span>
            )}
          </div>
          <div className='formDefaultInputContainer'>
            <label htmlFor='lastName' className='formDefaultLabel'>
              Last Name
            </label>
            <input
              id='lastName'
              placeholder='Smith'
              defaultValue={addUserFormData.lastName}
              className='formDefaultInput'
              {...register('lastName', {
                onChange: (e) => handleInputChange(e),
              })}
            />
            {errors.lastName && (
              <span className='invalidInput'>
                This field is required
              </span>
            )}
          </div>
          <div className='formDefaultInputContainer'>
            <label htmlFor='email' className='formDefaultLabel'>
              Email
            </label>
            <input
              id='email'
              className='formDefaultInput'
              placeholder='john@smith.com'
              defaultValue={addUserFormData.email}
              {...register('email', {

                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                onChange: (e) => handleInputChange(e),
              })}
            />
            {errors.email?.type === 'pattern' && (
              <span className='invalidInput'>Enter valid email</span>
            )}
          </div>
          <div className='formDefaultInputContainer'>
            <label htmlFor='birthday' className='formDefaultLabel'>
              Birthday
            </label>

            <Controller
              control={control}
              name='birthday'
              rules={{ required: true }}
              render={({ field }) => (
                <DatePicker
                  id='birthday'
                  className='formDefaultInput'
                  dateFormat='dd-MM-yyyy'
                  selected={moment(field.value).toDate()}
                  onChange={(date) => field.onChange(date)}
                  maxDate={moment().toDate()}
                  error={!!errors.birthday}
                />
              )}
            />
            {errors.birthday && (
              <span className='invalidInput'>
                This field is required
              </span>
            )}
          </div>
          <div className='formDefaultInputContainer'>
            <label htmlFor='password' className='formDefaultLabel'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='formDefaultInput'
              placeholder='******'
              {...register('password', {
                onChange: (e) => handleInputChange(e),
              })}
            />
          </div>
          <div className='formDefaultInputContainer'>
            <label htmlFor='passwordRepeat' className='formDefaultLabel'>
              Repeat Password
            </label>
            <input
              type='password'
              id='passwordRepeat'
              placeholder='******'
              className='formDefaultInput'
              {...register('passwordRepeat', {
                onChange: (e) => handleInputChange(e),
                validate: {
                  passEqual: (value) =>
                    value === getValues().password || "Password doesn't match",
                },
              })}
            />
            {errors.passwordRepeat?.type === 'passEqual' && (
              <span className='invalidInput'>Passwords don't match</span>
            )}
          </div>
        </div>
        <button type='submit' className='formSubmitBtn'>
          SAVE
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;
