import React from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';
import ProfilePhotoSelector from '../../Components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';

const Signup = ({setCurrentPage}) => {
  const [profilePic, setProfilePic] = React.useState(null);
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  // handle signup form submit
  const handleSignup = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    if (!fullName) {
      setError('Full name is required');
      return;
    }

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
      <h3 className="text-lg font-semibold text-black"> Create an Account </h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6"> Enter your Credentials </p>

      <form onSubmit={handleSignup}> 

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input 
            value={fullName}
            onChange={({target}) => setFullName(target.value)}
            label="Full Name"
            placeholder="Saaheil Kalyani"
            type="text"
          />
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
        </div>

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p> }

        <button type='submit' className="btn-primary">
          Sign up
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Already have an account? {""}
          <button className="font-medium text-primary underline cursor-pointer" 
            onClick={() => setCurrentPage('login')}
          > Login </button>
        </p>
      </form>

    </div>
  )
}

export default Signup
