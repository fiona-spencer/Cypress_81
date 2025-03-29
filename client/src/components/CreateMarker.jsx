import { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateMarker = () => {
  const [position, setPosition] = useState({ lat: '', lng: '' });
  const [locationName, setLocationName] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState(null);
  const [isCreated, setIsCreated] = useState(false);  // Flag to check if the marker was created successfully

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/marker/createMarkers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ position, locationName, department }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      // Mark the marker as created successfully
      setIsCreated(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Create a New Marker</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Location Name:</label>
          <input 
            type="text" 
            value={locationName} 
            onChange={(e) => setLocationName(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Department:</label>
          <input 
            type="text" 
            value={department} 
            onChange={(e) => setDepartment(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Latitude:</label>
          <input 
            type="number" 
            value={position.lat} 
            onChange={(e) => setPosition({ ...position, lat: e.target.value })}
            required 
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input 
            type="number" 
            value={position.lng} 
            onChange={(e) => setPosition({ ...position, lng: e.target.value })}
            required 
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Create Marker</button>
      </form>

      {/* If the marker is created successfully, display the link */}
      {isCreated && (
        <div>
          <p>Marker created successfully!</p>
          <Link to="/user-markers">Go to Your Markers</Link>  {/* Link to the user markers page */}
        </div>
      )}

      {/* Display this link even if the marker wasn't created */}
      {!isCreated && (
        <div>
          <Link to="/user-markers">View Your Markers</Link>  {/* Link to the user markers page */}
        </div>
      )}
    </div>
  );
};

export default CreateMarker;
