import { Label, TextInput, Button, Alert, Spinner, Select } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({
    userType: 'Public', // Default to Public
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !formData.userType) {
      return setErrorMessage("Please fill out all fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage("An error occurred while signing up.");
      setLoading(false);
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
        <div className="text-lg font-semibold mt-4">
          Sign Up
        </div>
        <p className='text-md mt-2'>
          Create a new account by providing your email, username, password, and user type.
        </p>

        {/* Sign Up Form */}
        <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit}>
          <div>
            <Label value="Your username" />
            <TextInput 
              type="text" 
              placeholder="Username" 
              id="username" 
              onChange={handleChange} 
            />
          </div>
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
              placeholder="Password" 
              id="password" 
              onChange={handleChange} 
            />
          </div>

          {/* User Type Selection */}
          <div>
            <Label value="Select User Type" />
            <Select
              id="userType"
              value={formData.userType}
              onChange={handleSelectChange}
            >
              <option value="Public">Public</option>
              <option value="City Staff">City Staff</option>
              <option value="Admin">Admin</option>
            </Select>
          </div>

          {/* Sign Up Button */}
          <Button type="submit" disabled={loading} className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:bg-gradient-to-bl focus:ring-cyan-300 dark:focus:ring-cyan-800">
            {
              loading ? (
                <>
                  <Spinner size='sm' />
                  <span className="pl-3">Loading...</span>
                </>
              ) : 'Sign Up'
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

        {/* Sign In Link */}
        <div className="flex gap-2 text-sm mt-5">
          <span>Already have an account?</span>
          <Link to='/sign-in' className="text-blue-500">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
