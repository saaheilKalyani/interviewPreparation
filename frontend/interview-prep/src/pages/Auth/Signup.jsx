import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';
import ProfilePhotoSelector from '../../Components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import { UserContext } from '../../context/userContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
// import uploadImage from '../../utils/uploadImage';

const Signup = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = React.useState(null);
  const [fullName, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const [error, setError] = React.useState(null);
  const { updateUser } = useContext(UserContext);

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
      setError('Please enter a valid email');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    setError("");

    try {
      // upload profile image if selected (commented out for now)
      // if (profilePic) {
      //   const imgUploadRes = await uploadImage(profilePic);
      //   profileImageUrl = imgUploadRes.imageUrl || "";
      // }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate('/dashboard');
      }

    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-xl font-semibold text-gray-900"> 
        Create an Account 
      </h3>
      <p className="text-sm text-gray-600 mt-2 mb-6"> 
        Enter your credentials to get started 
      </p>

      <form onSubmit={handleSignup} className="flex flex-col gap-4"> 
        {/* <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} /> */}

        <div className="grid grid-cols-1 gap-2">
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

        {error && (
          <p className="text-red-500 text-xs pb-2.5">
            {error}
          </p>
        )}

        {/* Button styled like Login & CreateSessionForm */}
        <button 
          type="submit" 
          className="w-full py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:opacity-90 transition"
        >
          Sign up
        </button>

        <p className="text-sm text-gray-700 mt-3">
          Already have an account?{" "}
          <button 
            type="button" 
            className="font-medium text-green-600 hover:underline"
            onClick={() => setCurrentPage('login')}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
