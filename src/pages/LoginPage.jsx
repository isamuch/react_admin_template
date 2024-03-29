import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
// APIs
import { fakeSignin } from '../apis/fakeAuthProvider';
// Components
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    if (fakeSignin(email, password)) {
      navigate('/');
    } else {
      setError('email', {
        type: 'custom',
        message: 'Email or password incorrect!',
      });
      setError('password', {
        type: 'custom',
        message: 'Email or password incorrect!',
      });
    }
  };

  const handleBypassAuth = () => {
    const email = 'test@test.com';
    const password = '123456789';
    fakeSignin(email, password);
    navigate('/');
  };

  return (
    <div className='h-screen flex flex-col'>
      <div className='m-5 mb-0 text-2xl font-semibold tracking-widest'>
        Strater.Project
      </div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className='flex grow justify-center items-center'>
          <div className='w-full m-5 p-4 sm:p-10 sm:w-[500px] bg-white flex flex-col gap-6 border rounded-md shadow-md'>
            <div className='flex justify-between items-center'>
              <div className='text-2xl font-semibold'>Login</div>
              <Link to={'/register'}>
                <div className='text-sm font-normal text-blue-600'>
                  Don&apos;t have an account?
                </div>
              </Link>
            </div>
            <div className='flex flex-col gap-4'>
              <LoginInput
                title={'Email Address'}
                typeInput={'email'}
                register={register('email', {
                  required: 'Email Address is required!',
                  validate: {
                    matchPattern: (v) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                      'Email address must be a valid address',
                  },
                })}
                error={errors.email?.message}
              />
              <LoginInput
                title={'Password'}
                typeInput={'password'}
                register={register('password', {
                  required: 'Password is required!',
                })}
                error={errors.password?.message}
              />
            </div>
            <div className='flex justify-between items-center'>
              <div className='ml-1'>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox size='small' defaultChecked />}
                    label={<div className='text-sm'>Keep me sign in</div>}
                  />
                </FormGroup>
              </div>
              <div className='hover:underline text-sm'>
                <Link to={'#'}>Forgot Password?</Link>
              </div>
            </div>
            <Button fullWidth variant='contained' size='large' type='submit'>
              Login
            </Button>
            <hr />
            <Button
              fullWidth
              variant='outlined'
              size='large'
              onClick={handleBypassAuth}
            >
              Bypass Authentication
            </Button>
          </div>
        </div>
      </form>
      <div className='text-center mb-4'>
        <div>© React Admin Template By Samuch</div>
      </div>
    </div>
  );
}

const LoginInput = ({ title, typeInput, error, register }) => {
  const isError = error ? true : false;
  const msgError = error ? error : '';

  return (
    <div className='flex flex-col gap-2'>
      <label className='text-sm text-gray-800'>{title}</label>
      <TextField
        fullWidth
        size='small'
        type={typeInput}
        error={isError}
        helperText={msgError}
        {...register}
      />
    </div>
  );
};

LoginInput.propTypes = {
  title: PropTypes.string,
  typeInput: PropTypes.string,
  error: PropTypes.string,
  focused: PropTypes.bool,
  register: PropTypes.object,
};

export default LoginPage;
