import { useState, useEffect } from 'react';

// You'll need to replace this with your Mapbox access token
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYmluaGR0cXhrIiwiYSI6ImNtYWM2d3lmYTAwN3Eyam9yMjl4eDM0N2UifQ.PXJRM_PItHodufA5RDGI5w';
const DEFAULT_MAP_CENTER = { lat: 21.0278, lng: 105.8342 }; // Hanoi coordinates

const useMapbox = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if Mapbox is already loaded
    if (window.mapboxgl) {
      setIsLoaded(true);
      return;
    }

    // Check if script is already being loaded
    if (document.querySelector('#mapbox-script')) {
      const existingScript = document.querySelector('#mapbox-script');
      existingScript.addEventListener('load', () => {
        setIsLoaded(true);
      });
      existingScript.addEventListener('error', () => {
        setError(new Error('Failed to load Mapbox API'));
      });
      return;
    }

    // Load Mapbox JavaScript API
    const script = document.createElement('script');
    script.id = 'mapbox-script';
    script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js';
    script.async = true;
    
    // Load Mapbox CSS
    const link = document.createElement('link');
    link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css';
    link.rel = 'stylesheet';
    
    script.addEventListener('load', () => {
      window.mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
      setIsLoaded(true);
    });
    
    script.addEventListener('error', () => {
      setError(new Error('Failed to load Mapbox API'));
    });
    
    document.head.appendChild(link);
    document.head.appendChild(script);

    return () => {
      // Clean up script if component unmounts before script loads
      if (document.querySelector('#mapbox-script') && !isLoaded) {
        document.head.removeChild(script);
        document.head.removeChild(link);
      }
    };
  }, []);

  const searchPlaces = async (query) => {
    if (!isLoaded) {
      throw new Error('Mapbox not initialized');
    }

    try {
      // Use Mapbox Geocoding API to search for places
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json`;
      const params = new URLSearchParams({
        access_token: MAPBOX_ACCESS_TOKEN,
        country: 'vn', // Focus on Vietnam
        limit: 8, // Number of results
        language: 'vi' // Vietnamese language
      });

      const response = await fetch(`${endpoint}?${params}`);
      const data = await response.json();

      if (data.features) {
        return data.features.map(place => ({
          name: place.text,
          description: place.place_name,
          location: {
            lng: place.center[0],
            lat: place.center[1]
          },
          placeId: place.id
        }));
      }
      return [];
    } catch (err) {
      console.error('Error searching places with Mapbox:', err);
      throw err;
    }
  };

  return {
    isLoaded,
    error,
    searchPlaces
  };
};

export default useMapbox;