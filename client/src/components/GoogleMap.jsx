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
  const [selectedIcon, setSelectedIcon] = useState(iconOptions[0].icon);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [markersData, setMarkersData] = useState([]);
  const navigate = useNavigate();

  // Load Google Maps Script
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&loading=async&libraries=places&callback=onGoogleMapsLoaded&v=weekly`;
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => setIsMapLoaded(true);
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

  const initMap = async () => {
    if (!mapRef.current) return;

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const map = new Map(mapRef.current, {
      center,
      zoom,
      mapId,
    });

    markersData.forEach((markerData) => {
      createMarker(map, markerData.position, markerData.department);
    });

    map.addListener('click', (e) => {
      setShowDropdown(true);
      const reportTag = document.createElement("div");
      reportTag.className = "report rounded-lg p-2 flex items-center justify-center text-white bg-blue-500 text-sm cursor-pointer transition transform duration-200 ease-in-out";
      reportTag.textContent = "Select Department";

      const newMarker = new AdvancedMarkerElement({
        map,
        position: e.latLng,
        content: reportTag,
      });

      newMarker.addListener("click", () => {
        toggleHighlight(newMarker, reportTag);
      });

      setMarkersData((prevData) => [
        ...prevData,
        { position: e.latLng, department: selectedDepartment },
      ]);
    });
  };

  const createMarker = (map, position, department) => {
    const { AdvancedMarkerElement } = google.maps.importLibrary("marker");

    const reportTag = document.createElement("div");
    reportTag.className = "report rounded-lg p-2 flex items-center justify-center text-white bg-blue-500 text-sm cursor-pointer transition transform duration-200 ease-in-out";
    reportTag.textContent = department;

    const newMarker = new AdvancedMarkerElement({
      map,
      position,
      content: reportTag,
    });

    newMarker.addListener("click", () => {
      toggleHighlight(newMarker, reportTag);
      navigate(`/marker/${department}`);
    });
  };

  const toggleHighlight = (marker, reportTag) => {
    const isHighlighted = reportTag.style.backgroundColor === 'rgb(220, 38, 38)';
    const isEnlarged = reportTag.style.transform === 'scale(1.5)';

    if (isHighlighted && isEnlarged) {
      reportTag.style.backgroundColor = 'rgb(59, 130, 246)';
      reportTag.style.transform = 'scale(1)';
    } else {
      reportTag.style.backgroundColor = 'rgb(220, 38, 38)';
      reportTag.style.transform = 'scale(1.5)';
    }
  };

  const handleDepartmentChange = (event) => {
    const selected = event.target.value;
    setSelectedDepartment(selected);
    setShowDropdown(false);
  };

  const renderIcon = (department) => {
    switch (department) {
      case 'Skull Crossbones':
        return <FaSkullCrossbones />;
      case 'Fire Extinguisher':
        return <FaFireExtinguisher />;
      case 'Taxi':
        return <FaTaxi />;
      case 'Plug':
        return <FaPlug />;
      case 'Dog':
        return <FaDog />;
      case 'Building':
        return <FaBuilding />;
      case 'Tree':
        return <FaTree />;
      case 'Snowflake':
        return <FaSnowflake />;
      case 'Trash':
        return <FaRegTrashAlt />;
      case 'Landmark':
        return <FaLandmark />;
      case 'Bug':
        return <FaBug />;
      case 'Wine Bottle':
        return <FaWineBottle />;
      case 'Water':
        return <FaWater />;
      default:
        return null;
    }
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
            <select onChange={handleDepartmentChange} className="w-full p-2 text-sm border border-gray-300 rounded-md">
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

      {selectedDepartment && (
        <h2 className="text-3xl font-bold text-[#234966] text-left py-2 inline-flex items-center mb-2">
          <span className="bg-blue-800 border-2 text-white rounded-lg p-3 mr-2">
            {renderIcon(selectedDepartment)}
          </span>
          {selectedDepartment}
        </h2>
      )}

      <div id="map" ref={mapRef} style={{ width: '100%', height: '500px' }}></div>
    </div>
  );
};

export default GoogleMap;
