import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/userLogin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { properties} from "../../config/properties";
import './Login.css'
import {text} from '../../data/index'

const LoginForm = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmitFormData = (data, e) => {
    e.preventDefault();
    axios
      .post(`${properties.host.api}/api/v1/users/login`, data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        dispatch(login({ userId: `${res.data.id}`, isLoggedIn: true }));
        navigate('/', { replace: true });
      })
      .catch((error) => {
      });
  };

  return (
    <div
      className='login-container'>
      <div
        className='login-text-box'>
        <h1>Welcome to <span style={{ color: '#626262' }}>Baby's</span></h1>
        <p>{text.login}</p>
      </div>
      <div className='login-form'>
        <form onSubmit={handleSubmit(handleSubmitFormData)}>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id='email'
            {...register('email', {
              required: true,
              pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            })}
            placeholder='user@domain.com'
            
          />
          {errors.email && (
            <span>This field is required</span>
          )}
          {errors.email?.type === 'pattern' && (
            <span>Enter valid email</span>
          )}

          <label htmlFor='password'> Password</label>
          <input
            type='password'
            {...register('password', { required: true })}
            id='password'
            placeholder='*****'
          />
          {errors.password && (
            <span>This field is required</span>
          )}
          <button className='login-btn'type='submit'>LOG IN</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
