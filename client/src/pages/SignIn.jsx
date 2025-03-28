import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.department) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen bg-[#2a5988] flex justify-center items-center'>
      <div className="bg-white px-6 pb-6 rounded-lg shadow-lg w-full max-w-lg">
        {/* Logo and Title */}
        <Link to='/' className='font-bold dark:text-white text-4xl'>
          <span className='rounded-sm text-white'>
          <img 
            className='mx-auto h-40' 
            src="https://stellasplace.ca/wp-content/uploads/2021/05/city-of-toronto-logo-vector.png" 
            alt="City of Toronto" 
          />
          </span>
        </Link>
          <div className="text-lg font-semibold">
            TO ISSUE A REPORT
          </div>
        <p className='text-md'>
          Sign in with your email, password, and department
          or with Google.
        </p>

        {/* Sign In Form */}
        <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit}>
          <div>
            <Label value="Your email" />
            <TextInput 
              type="email" 
              placeholder="name@company.com" 
              id="email" 
              onChange={handleChange} 
            />
          </div>
          <div>
            <Label value="Your password" />
            <TextInput 
              type="password" 
              placeholder="********" 
              id="password" 
              onChange={handleChange} 
            />
          </div>
          
          {/* Department Selection */}
          <div>
            <Label value="Department Type" />
            <select 
              id="department" 
              onChange={handleChange} 
              className="block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Department</option>
              <option value="Public">Public</option>
              <option value="City Staff">City Staff</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          {/* Sign In Button */}
          <Button type="submit" disabled={loading} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800">
            {
              loading ? (
                <>
                  <Spinner size='sm' />
                  <span className="pl-3">Loading...</span>
                </>
              ) : 'Sign In'
            }
          </Button>

          {/* OAuth */}
          <OAuth />

          {/* Error Message */}
          {
            errorMessage && (
              <Alert className="mt-5" color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </form>

        {/* Sign Up Link */}
        <div className="flex gap-2 text-sm mt-5">
          <span>Don't have an account?</span>
          <Link to='/sign-up' className="text-blue-500">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
