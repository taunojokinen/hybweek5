
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Map from './screens/Map';
import Constants from 'expo-constants';
import { PaperProvider } from 'react-native-paper';
import MainAppBar from './components/mainAppBar';
import { useState } from 'react';
import * as Location from 'expo-location';

const settings ={
  backgroundColor: '#00a484',
}

const icons = {
  location_not_known: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_known: 'crosshairs-gps',
} 


export default function App() {
  const [icon, setIcon] = useState(icons.location_not_known);

  const [location, setLocation] = useState({
    latitude: 60.06,
    longitude: 25.41,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getUserPosition = async () => {
    setIcon(icons.location_searching);
    let{ status } = await Location.requestForegroundPermissionsAsync();
    
    try {
      if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
      }
      const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});
      setLocation({...location, latitude: position.coords.latitude, longitude: position.coords.longitude, });
      setIcon(icons.location_known);
      } catch (error) {
          console.log(error);
      }   
  }
  
  return (
    <PaperProvider>
      <MainAppBar 
        title="Map"
        backgroundColor={settings.backgroundColor}  
        icon={icon} 
        getUserPosition={getUserPosition} 
        onBackPress={() => console.log('Back pressed')}/>
      <SafeAreaView style = {styles.container}>
        <Map location={location} />
      </SafeAreaView>
    </PaperProvider>
  );
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
    },
});
