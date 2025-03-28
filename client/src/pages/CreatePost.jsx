import React, { useState } from 'react';
import { Alert, Button, FileInput, Select, TextInput, Checkbox } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [isVerified, setIsVerified] = useState(false); // To track checkbox state

  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isVerified) {
      setPublishError('Please verify your submission.');
      return;
    }
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Report an Issue</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        {/* TItle */}
        <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
        {/* Full Name */}
        <TextInput
          type='text'
          placeholder='Full Name'
          required
          id='fullName'
          className='flex-1'
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
        />

        {/* Email */}
        <TextInput
          type='email'
          placeholder='Email'
          required
          id='email'
          className='flex-1'
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />

        {/* Phone Number */}
        <TextInput
          type='tel'
          placeholder='Phone Number'
          required
          id='phoneNumber'
          className='flex-1'
          onChange={(e) =>
            setFormData({ ...formData, phoneNumber: e.target.value })
          }
        />

        {/* Severity of Damage */}
        <TextInput
          type='number'
          placeholder='Severity (1-10)'
          required
          id='severity'
          min="1"
          max="10"
          className='flex-1'
          onChange={(e) =>
            setFormData({ ...formData, severity: e.target.value })
          }
        />

        {/* Location */}
        <TextInput
          type='text'
          placeholder='Location (Street, City, Province, Country)'
          required
          id='location'
          className='flex-1'
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />

        {/* Date of Incident */}
        <TextInput
          type='date'
          required
          id='dateOfIncident'
          className='flex-1'
          onChange={(e) =>
            setFormData({ ...formData, dateOfIncident: e.target.value })
          }
        />

        {/* Category */}
        <Select
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="uncategorized">Select a category</option>
          <option value="Emergency">Fire/Ambulance</option>
          <option value="TTC">TTC</option>
          <option value="Hydro">Hydro</option>
          <option value="Poison Control">Poison Centre</option>
          <option value="Animal Services">Animal Services</option>
          <option value="Building Permits">Building Permits</option>
          <option value="Parks and Recreation">Parks & Recreation</option>
          <option value="Waste Collection">Waste Collection</option>
          <option value="Water Leaks">Water Main</option>
          <option value="Graffiti Removal">Graffiti Removal</option>
          <option value="Tree Maintenance">Tree Maintenance</option>
          <option value="Public Health">Public Health</option>
          <option value="Snow Removal">Snow Removal</option>
        </Select>

        {/* File Upload */}
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}

        {/* ReactQuill (Description) */}
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />

        {/* Verify Checkbox */}
        <div className='flex items-center'>
          <Checkbox
            id="verify"
            checked={isVerified}
            onChange={(e) => setIsVerified(e.target.checked)} // Fix for the checkbox
          />
          <label htmlFor="verify" className='ml-2'>
            I verify that all the information provided is correct.
          </label>
        </div>

        {/* Submit Button */}
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
