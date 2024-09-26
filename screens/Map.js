import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useState } from 'react';




export default function Map(props) {
    const [markers, setMarkers] = useState([]);

    const showMarker = (e) => {
        const coords= e.nativeEvent.coordinate;
        setMarkers([...markers, coords]);
    };


/*    useEffect(() => {
        (async () => {
        getUserPosition();
        })()
    }, []);*/


  return (
<MapView
    style={styles.map}
    region={props.location}
    mapType='standard'
    onLongPress={showMarker}
    >
        {markers.map((marker,index) => ( 
            <Marker
                key={index}
                title={`Marker ${index+1}`} 
                coordinate={{latitude: marker.latitude, longitude: marker.longitude}}
                />
        ))}
    </MapView>
  
    );
}


const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'   
    }
    });
