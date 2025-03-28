import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { FaSkullCrossbones, FaFireExtinguisher, FaTaxi, FaPlug, FaDog, FaBuilding, FaTree, FaSnowflake, FaRegTrashAlt, FaLandmark, FaBug, FaWineBottle, FaWater } from 'react-icons/fa';

// Load the Google Maps script with a promise
const loadGoogleMapsScript = (apiKey) => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(); // If the API is already loaded, resolve immediately
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,map&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error('Google Maps API script failed to load'));
    script.onload = () => resolve(); // Resolve once script is fully loaded
    document.head.appendChild(script);
  });
};

export default function About() {
  const mapContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', icon: '' });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const pinIcons = [
    { value: 'skull', label: 'Skull Crossbones', icon: FaSkullCrossbones },
    { value: 'fire', label: 'Fire Extinguisher', icon: FaFireExtinguisher },
    { value: 'taxi', label: 'Taxi', icon: FaTaxi },
    { value: 'plug', label: 'Plug', icon: FaPlug },
    { value: 'dog', label: 'Dog', icon: FaDog },
    { value: 'building', label: 'Building', icon: FaBuilding },
    { value: 'tree', label: 'Tree', icon: FaTree },
    { value: 'snowflake', label: 'Snowflake', icon: FaSnowflake },
    { value: 'trash', label: 'Trash', icon: FaRegTrashAlt },
    { value: 'landmark', label: 'Landmark', icon: FaLandmark },
    { value: 'bug', label: 'Bug', icon: FaBug },
    { value: 'wine', label: 'Wine Bottle', icon: FaWineBottle },
    { value: 'water', label: 'Water', icon: FaWater },
  ];

  useEffect(() => {
    const apiKey = 'AIzaSyA1wOqcLSGKkhNJQYP9wH06snRuvSJvRJY'; // Replace with your actual API key

    const initMap = () => {
      loadGoogleMapsScript(apiKey)
        .then(() => {
          if (!window.google || !window.google.maps) {
            console.error("Google Maps API failed to load");
            return;
          }

          const mapInstance = new window.google.maps.Map(mapContainerRef.current, {
            center: { lat: 43.65107, lng: -79.347015 },
            zoom: 12,
          });
          setMap(mapInstance);

          const searchBox = new window.google.maps.places.Autocomplete(inputRef.current);
          searchBox.bindTo('bounds', mapInstance);

          searchBox.addListener('place_changed', () => {
            const place = searchBox.getPlace();
            if (!place.geometry) return;
            mapInstance.panTo(place.geometry.location);
            mapInstance.setZoom(15);
          });

          mapInstance.addListener('click', (event) => {
            setShowForm(true);
            setMarkerPosition(event.latLng);
          });
        })
        .catch(error => {
          console.error('Error initializing map:', error);
        });
    };

    initMap(); // Call the initMap function when the component mounts

    return () => {
      markers.forEach(markerObj => {
        markerObj.marker.setMap(null);
        if (markerObj.contentDiv) {
          ReactDOM.unmountComponentAtNode(markerObj.contentDiv);
        }
      });
    };
  }, []); // Empty dependency array ensures this runs only once when component mounts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!markerPosition || !formData.title || !formData.description || !formData.icon) {
      alert('Please fill all fields and select an icon!');
      return;
    }

    try {
      const selectedIcon = pinIcons.find(icon => icon.value === formData.icon);
      if (!selectedIcon) return;

      const contentDiv = document.createElement('div');
      ReactDOM.render(
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md">
            <selectedIcon.icon className="text-red-500 text-xl" />
          </div>
          <div className="bg-white px-2 py-1 rounded mt-1 text-xs font-bold shadow-sm">
            {formData.title}
          </div>
        </div>,
        contentDiv
      );

      const marker = new window.google.maps.Marker({
        position: markerPosition,
        map: map,
        title: formData.title,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">' +
            '<rect width="40" height="40" fill="transparent"/>' +
            '</svg>'
          )}`,
          scaledSize: new window.google.maps.Size(40, 40),
          anchor: new window.google.maps.Point(20, 40)
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2 min-w-[200px]">
            <h3 class="m-0 mb-1 text-[#234966]">${formData.title}</h3>
            <p class="m-0">${formData.description}</p>
            <div class="mt-2 text-center text-2xl text-gray-600">
              ${ReactDOM.renderToString(<selectedIcon.icon className="text-red-500" />)}
            </div>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      setMarkers(prev => [...prev, { marker, infoWindow, contentDiv }]);

      setShowForm(false);
      setFormData({ title: '', description: '', icon: '' });

    } catch (error) {
      console.error('Error creating marker:', error);
    }
  };

  return (
    <div className="relative w-full h-full">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search for a place"
        className="absolute top-2 left-2 z-10 w-72 p-2 mb-2 rounded border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <div 
        ref={mapContainerRef} 
        className="w-full h-screen"
      ></div>

      {showForm && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-lg shadow-lg z-50 w-80">
          <h3 className="mt-0 mb-4 text-lg font-semibold">Add a New Pin</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter the title"
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter the description"
                required
                className="w-full p-2 border border-gray-300 rounded min-h-[60px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Icon:</label>
              <div className="flex flex-wrap gap-3">
                {pinIcons.map((icon) => (
                  <div 
                    key={icon.value}
                    onClick={() => setFormData({...formData, icon: icon.value})}
                    className={`flex flex-col items-center p-2 rounded cursor-pointer border-2 ${
                      formData.icon === icon.value 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <icon.icon className={`text-2xl ${
                      formData.icon === icon.value ? 'text-blue-500' : 'text-gray-600'
                    }`} />
                    <span className="text-xs mt-1">{icon.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Pin
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
