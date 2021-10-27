import React, { useState } from "react"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import { useStaticQuery, graphql } from "gatsby"
import mapStyles from "./mapStyles"

const Indianapolis = {
  lat: 39.768402,
  lng: -86.158066,
}

const mapContainerStyle = {
  height: "100%",
  width: "100%",
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}

const Map = () => {
  const data = useStaticQuery(graphql`
    {
      allKmlPoint {
        edges {
          node {
            properties {
              name
              Longitude
              Latitude
              FRP_Project_Numbers
              description
              styleUrl
              styleHash
            }
            id
          }
        }
      }
    }
  `)

  const [selected, setSelected] = useState(null)

  const frpLocation = data.allKmlPoint.edges

  //console.log(process.env.GATSBY_GOOGLE_MAPS_API_KEY)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GATSBY_GOOGLE_MAPS_API_KEY,
  })
  const mapRef = React.useRef()
  const onMapLoad = React.useCallback(map => {
    mapRef.current = map
    console.log(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    console.log(map)
  }, [])

  if (loadError) return "Error"
  if (!isLoaded) {
    return "Loading..."
  }

  //console.log("comes here")
  return (
    <div className="map-container">
      <span className="top-text">Project</span>
      <span className="horizontal-line"></span>
      <span className="bottom-text">
        Locati<span className="full-color">o</span>ns
      </span>
      <span className="map-blurb">
        FRP has a project portfolio across a wide geographic region. Click the
        Map to Zoom and pan to the project locations for various market types.
      </span>
      <div className="map-wrapper">
        <GoogleMap
          zoom={8}
          center={Indianapolis}
          mapContainerStyle={mapContainerStyle}
          options={options}
          onUnmount={onUnmount}
          onLoad={onMapLoad}
        >
          {frpLocation.map(marker => (
            <Marker
              key={marker.node.id}
              position={{
                lat: parseFloat(marker.node.properties.Latitude),
                lng: parseFloat(marker.node.properties.Longitude),
              }}
              icon={{
                url: `icon_${marker.node.properties.styleUrl.slice(-6)}.svg`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
              onClick={() => {
                setSelected(marker)
              }}
            />
          ))}

          {selected ? (
            <InfoWindow
              position={{
                lat: parseFloat(selected.node.properties.Latitude),
                lng: parseFloat(selected.node.properties.Longitude),
              }}
              onCloseClick={() => {
                setSelected(null)
              }}
            >
              <div>
                <p>{selected.node.properties.name}</p>
              </div>



            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    </div>
  )
}
export default Map;