import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react'
import Marker from './Marker';

const Map = () => {
  const [center, setCenter] = useState({lat: 40.74340037270744, lng: -73.97576031527545 });
  const [zoom, setZoom] = useState(11);
  return (
      <div style={{ height: '400px', width: '400px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_MAPS_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        <Marker
          lat={40.74340037270744}
          lng={-73.97576031527545}
          name="My Marker"
          color="blue"
        />
      </GoogleMapReact>
    </div>
  );
}

export default Map
