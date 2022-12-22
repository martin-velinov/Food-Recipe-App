import { useNavigate } from 'react-router-dom';
import { useForm, Controller, get } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './NewUserForm.module.css';
import { properties} from "../../config/properties";
import {text} from '../../data/index'
import avatar from '../../assets/img/avatar.png'

const NewUserForm = () => {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    mode: 'all',
  });

  const handleSubmitData = (data, e) => {
    e.preventDefault();
    axios
      .post(`${properties.host.api}/api/v1/users/register`, {
        ...data,
        image: avatar,
      })
      .then((res) => {
        navigate('/login', { replace: true });
      })
      .catch((error) => {

      });
  };

  return (
    <div className={styles.registerWrapper}>
      <div className={styles.registerTextbox}>
        <h1 className={styles.textboxHeader}>
          Create your <span style={{ color: '#626262' }}>account</span>
        </h1>
        <p className={styles.textboxParagraph}>
          {text.createAccount}
        </p>
      </div>
      <form
        className={styles.registerForm}
        onSubmit={handleSubmit(handleSubmitData)}
      >
        <div className={styles.defaultInputWrapper}>
          <label htmlFor='firstName' className={styles.defaultLabel}>
            First Name
          </label>
          <input
            id='firstName'
            className={styles.defaultInput}
            placeholder='John'
            {...register('firstName', {
              required: true,
            })}
          />
          {errors.firstName && (
            <span className={styles.invalidInput}>This field is required</span>
          )}
        </div>
        <div className={styles.defaultInputWrapper}>
          <label htmlFor='lastName' className={styles.defaultLabel}>
            Last Name
          </label>
          <input
            id='lastName'
            {...register('lastName', {
              required: true,
            })}
            placeholder='Smith'
            className={styles.defaultInput}
          />
          {errors.lastName && (
            <span className={styles.invalidInput}>This field is required</span>
          )}
        </div>

        <div className={styles.defaultInputWrapper}>
          <label htmlFor='email' className={styles.defaultLabel}>
            Email
          </label>
          <input
            id='email'
            {...register('email', {
              required: true,
              pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            })}
            placeholder='john@smith.com'
            className={styles.defaultInput}
          />
          {errors.email && (
            <span className={styles.invalidInput}>This field is required</span>
          )}
          {errors.email?.type === 'pattern' && (
            <span className={styles.invalidInput}>Enter valid email</span>
          )}
        </div>
        <div className={styles.defaultInputWrapper}>
          <label htmlFor='birthday' className={styles.defaultLabel}>
            Birthday
          </label>
          <Controller
            control={control}
            name='birthday'
            rules={{ required: true }}
            render={({ field }) => (
              <DatePicker
                id='birthday'
                className={styles.defaultInput}
                placeholderText='22-11-2000'
                onChange={(date) => field.onChange(date)}
                selected={field.value}
                dateFormat='dd-MM-yyyy'
                error={!!errors.birthday}
              />
            )}
          />
          {errors.birthday && (
            <span className={styles.invalidInput}>This field is required</span>
          )}
        </div>
        <div className={styles.defaultInputWrapper}>
          <label htmlFor='password' className={styles.defaultLabel}>
            Password
          </label>
          <input
            type='password'
            id='password'
            className={styles.defaultInput}
            placeholder='******'
            {...register('password', {
              required: true,
              minLength: {
                value: 6,
                message: 'Password must have at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <span className={styles.invalidInput}>This field is required</span>
          )}
          {errors.password?.type === 'minLength' && (
            <span className={styles.invalidInput}>
              Must be longer than 6 characters
            </span>
          )}
        </div>
        <div className={styles.defaultInputWrapper}>
          <label htmlFor='confirmPassword' className={styles.defaultLabel}>
            Repeat Password
          </label>
          <input
            type='password'
            id='confirmPassword'
            className={styles.defaultInput}
            placeholder='******'
            {...register('confirmPassword', {
              required: true,
              validate: {
                passEqual: (value) =>
                  value === getValues().password || "Password doesn't match",
              },
            })}
          />
          {errors.confirmPassword?.type === 'passEqual' && (
            <span className={styles.invalidInput}>Passwords don't match</span>
          )}
        </div>
        <button type='submit' className={styles.formSubmitBtn}>
          CREATE ACCOUNT
        </button>
      </form>
    </div>
  );
};

export default NewUserForm;
