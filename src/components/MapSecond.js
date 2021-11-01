import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react'
import Marker from './Marker';

const MapSecond = () => {
  const [center, setCenter] = useState({lat: 45.260659916113525, lng: 19.843249526321753 });
  const [zoom, setZoom] = useState(14);
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_MAPS_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
        className="map"
      >
        <Marker
          lat={45.260659916113525}
          lng={19.843249526321753}
          name="My Marker"
          color="blue"
        />
      </GoogleMapReact>
    </div>
  );
}

export default MapSecond
