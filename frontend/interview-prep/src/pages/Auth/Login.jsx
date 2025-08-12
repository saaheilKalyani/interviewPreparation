import React from 'react'
import { useNavigate } from 'react-router-dom';

import Input from '../../Components/Inputs/Input';
import { validateEmail } from '../../utils/helper';


const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  // handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please fill in all fields');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    setError("");

    // Login Api call
    try {
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }

  }


  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">
        Welcome Back
      </h3>
      <p className="text-xs text-state-700 mt-[5px] mb-6">
        Please Enter your credentials to login
      </p>

      <form onSubmit={handleLogin} >
        <Input 
          value={email}
          onChange={({target}) => setEmail(target.value)}
          label="Email address"
          placeholder="saaheil@gmail.com"
          type="text"
        />
        <Input 
          value={password}
          onChange={({target}) => setPassword(target.value)}
          label="Password"
          placeholder="********"
          type="password"
        />

        {error && 
          <p className="text-red-500 text-xs pb-2.5">
            {error}
          </p>
        }

        <button type='submit' className='btn-primary'>
          Login
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Dont have an account? {""}
          <button className="font-medium text-primary underline cursor-pointer" 
            onClick={() => setCurrentPage('signup')}
          > Sign Up </button>
        </p>

      </form>
      
    </div>
  )
}

export default Login;
