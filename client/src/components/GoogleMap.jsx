import React, { useEffect, useRef, useState } from 'react';
import { FaSkullCrossbones, FaFireExtinguisher, FaTaxi, FaPlug, FaDog, FaBuilding, FaTree, FaSnowflake, FaRegTrashAlt, FaLandmark, FaBug, FaWineBottle, FaWater } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const iconOptions = [
  { label: 'Skull Crossbones', icon: <FaSkullCrossbones /> },
  { label: 'Fire Extinguisher', icon: <FaFireExtinguisher /> },
  { label: 'Taxi', icon: <FaTaxi /> },
  { label: 'Plug', icon: <FaPlug /> },
  { label: 'Dog', icon: <FaDog /> },
  { label: 'Building', icon: <FaBuilding /> },
  { label: 'Tree', icon: <FaTree /> },
  { label: 'Snowflake', icon: <FaSnowflake /> },
  { label: 'Trash', icon: <FaRegTrashAlt /> },
  { label: 'Landmark', icon: <FaLandmark /> },
  { label: 'Bug', icon: <FaBug /> },
  { label: 'Wine Bottle', icon: <FaWineBottle /> },
  { label: 'Water', icon: <FaWater /> },
];

const GoogleMap = ({ apiKey, mapId = '42c8848d94ad7219', center = { lat: 43.7, lng: -79.42 }, zoom = 12 }) => {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [markersData, setMarkersData] = useState([]);
  const [selectedIcon, setSelectedIcon] = useState(iconOptions[0].icon); // Default icon selected
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const navigate = useNavigate();

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&libraries=places&callback=onGoogleMapsLoaded&v=weekly`;
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        setIsMapLoaded(true);  // Update state when the map script is loaded
      };

      script.onerror = () => {
        console.error('Google Maps API failed to load');
        setIsMapLoaded(false);
      };
    };

    window.onGoogleMapsLoaded = () => {
      initMap();
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      setIsMapLoaded(true);
    }

    return () => {
      const script = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');
      if (script) {
        document.body.removeChild(script);
      }
      delete window.onGoogleMapsLoaded;
    };
  }, [apiKey]);

  // Fetch markers from the database
  useEffect(() => {
    fetch('http://localhost:5173/api/marker/getMarkers')
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setMarkersData(data.data);  // Successfully set the markers
        } else {
          console.error('Fetched data is not valid:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching markers:', error);
      });
  }, []);

  // Initialize the map once the Google Maps API is loaded and mapRef is set
  useEffect(() => {
    if (isMapLoaded && mapRef.current) {
      initMap();
    }
  }, [isMapLoaded, mapRef.current]);

  // Initialize the map and place markers
  const initMap = async () => {
    if (!mapRef.current) {
      console.error('Map container reference is null.');
      return;
    }

    try {
      const { Map } = await google.maps.importLibrary('maps');
      const map = new Map(mapRef.current, {
        center,
        zoom,
        mapId,
      });

      console.log('Map initialized successfully:', map);

      // Create markers based on fetched data
      markersData.forEach((markerData) => {
        createMarker(map, markerData.position, markerData.locationName);
      });

      // Add a click listener to add a new marker on map click
      map.addListener('click', (e) => {
        setShowDropdown(true);
        const reportTag = document.createElement('div');
        reportTag.className = 'report rounded-lg p-2 flex items-center justify-center text-white bg-blue-500 text-sm cursor-pointer transition transform duration-200 ease-in-out';
        reportTag.textContent = 'Select Department';

        // Create new marker on map click
        createMarker(map, e.latLng, 'New Marker');
      });
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  const createMarker = (map, position, locationName) => {
    const marker = new google.maps.Marker({
      map,
      position,
      title: locationName,
    });

    // Add click listener to the marker
    marker.addListener('click', () => {
      console.log(`Marker clicked: ${locationName}`);
      navigate(`/marker/${locationName}`);
    });
  };

  const handleDepartmentChange = (event) => {
    const selected = event.target.value;
    setSelectedDepartment(selected);

    const reportTag = document.createElement('div');
    reportTag.className = 'report';
    reportTag.style.backgroundColor = 'blue';
    reportTag.style.color = 'white';
    reportTag.textContent = selected;

    const markers = document.querySelectorAll('.report');
    markers.forEach(marker => {
      marker.textContent = selected;
      marker.style.backgroundColor = 'blue';
      marker.style.color = 'white';
    });

    setShowDropdown(false);
  };

  if (!isMapLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <div>
      <h3>My Google Maps Demo with Custom Report Marker</h3>

      {showDropdown && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <label className="block text-lg mb-2">Select Department: </label>
            <select
              onChange={handleDepartmentChange}
              className="w-full p-2 text-sm border border-gray-300 rounded-md"
            >
              <option value="">-- Select --</option>
              {iconOptions.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div id="map" ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default GoogleMap;
