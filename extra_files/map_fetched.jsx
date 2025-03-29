import React, { useEffect, useRef, useState } from 'react';
import { FaSkullCrossbones, FaFireExtinguisher, FaTaxi, FaPlug, FaDog, FaBuilding, FaTree, FaSnowflake, FaRegTrashAlt, FaLandmark, FaBug, FaWineBottle, FaWater } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const GoogleMap = ({ apiKey, mapId = '42c8848d94ad7219', center = { lat: 43.7, lng: -79.42 }, zoom = 12 }) => {
  const mapRef = useRef(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [markersData, setMarkersData] = useState([]);
  const navigate = useNavigate();

  // Load Google Maps API
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&libraries=geometry,places&callback=onGoogleMapsLoaded`;
      script.async = true;
      document.body.appendChild(script);
    };

    window.onGoogleMapsLoaded = () => {
      setIsMapLoaded(true);
      console.log('Google Maps loaded successfully.');
    };

    if (!window.google) {
      loadGoogleMapsScript();
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

    // Optionally, add a click event to show the location name in the console or navigate to a new route
    marker.addListener('click', () => {
      console.log(`Marker clicked: ${locationName}`);
      navigate(`/marker/${locationName}`);
    });
  };

  if (!isMapLoaded) {
    return <div>Loading map...</div>;
  }

  return (
    <div>
      <h3>My Google Maps Demo with Custom Report Marker</h3>
      <div id="map" ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default GoogleMap;
