import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;
const APIKEY = 'go get ur own smh';

class MyGeolocation {
  async getCurrentPosition() {
    const pos = await Geolocation.getCurrentPosition();
    console.log('Current position:', pos);
    return pos;
  }
}

const sendGetReq = async(route: string) => {
  return await axios({
    url: route,
    method: 'get'
  }).then((res: any) => {
    console.log(res);
    return res.data;
  })

}

export const MapContainer = () => {
  const mapStyles = {
    height: '80vh',
    width: '100%'
  };

  const defaultCenter = {
    lat: 43.472651, lng: -80.534000
  };

  const [ currentPosition, setCurrentPosition ] = useState({});

  useEffect(() => {
    const fetchData = async() => {
      const newGeo = new MyGeolocation();
      let latitude: any;
      let longitude: any;
      await newGeo.getCurrentPosition()
        .then((data: any) => {
          // TODO: remove this 
          latitude = defaultCenter.lat;
          longitude = defaultCenter.lng;
          //latitude = data.coords.latitude;
          //longitude = data.coords.longitude;
          const route = `https://roads.googleapis.com/v1/nearestRoads?points=${latitude},${longitude}&key=${APIKEY}`
          return sendGetReq(route);
        })
        .then(data => (setCurrentPosition(
          Object.keys(data).length ? {
            lat: data.snappedPoints[0].location.latitude,
            lng: data.snappedPoints[0].location.longitude
          } : {
            lat: latitude,
            lng: longitude
        })));
    };

    fetchData();
  }, []);

  const onMarkerDragEnd = (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng })
  };
  
  return (
    <LoadScript
      googleMapsApiKey={APIKEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={17}
        center={Object.keys(currentPosition).length ?
            currentPosition : defaultCenter}>
        {
          Object.keys(currentPosition).length ?
          <Marker 
            position={currentPosition}
            onDragEnd={e => onMarkerDragEnd(e)}
            draggable={true}
          /> : null

        }
      </GoogleMap>
    </LoadScript>
  )
}

export default MapContainer;
