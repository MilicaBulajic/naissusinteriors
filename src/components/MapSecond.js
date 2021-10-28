import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: 40.74340037270744,
  lng: -73.97576031527545
};

function MapSecond() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.GATSBY_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
<Marker
              // defaultPlace={center}
              position={center}       
              // ref={refMap}
              // defaultPosition={center}
              // onDrag={handleBoundsChanged}
              // onDragEnd={handleDragEnd}
            />
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(MapSecond)
