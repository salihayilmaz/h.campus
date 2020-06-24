import React from "react";
import {
  StyleSheet,
  View,
  Platform,
  Dimensions,
  SafeAreaView
} from "react-native";
import MapView, { Marker, AnimatedRegion } from "react-native-maps";

class MapTracking extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        coordinate: new AnimatedRegion({
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: 0,
          longitudeDelta: 0
        })
      };
    }
    //api key gelecek
  
    componentDidMount() {
      this.watchLocation();
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (this.props.latitude !== prevState.latitude) {
        this.pubnub.publish({
          message: {
            latitude: this.state.latitude,
            longitude: this.state.longitude
          },
          channel: "location"
        });
      }
    }
  
    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }
  
    watchLocation = () => {
      const { coordinate } = this.state;
  
      this.watchID = navigator.geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
  
          const newCoordinate = {
            latitude,
            longitude
          };
  
          if (Platform.OS === "android") {
            if (this.marker) {
              this.marker._component.animateMarkerToCoordinate(
                newCoordinate,
                500 // dot duration
              );
            }
          } else {
            coordinate.timing(newCoordinate).start();
          }
  
          this.setState({
            latitude,
            longitude
          });
        },
        error => console.log(error),
        {
          enableHighAccuracy: true,
          timeout: 3000,
          maximumAge: 1000,
          distanceFilter: 10
        }
      );
    };
  
    getMapRegion = () => ({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    });
  
    render() {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <MapView
              style={styles.map}
              showUserLocation
              followUserLocation
              loadingEnabled
              region={this.getMapRegion()}
            >
              <Marker.Animated
                ref={marker => {
                  this.marker = marker;
                }}
                coordinate={this.state.coordinate}
              />
            </MapView>
          </View>
        </SafeAreaView>
      );
    }
  }
  
  
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "flex-end",
      alignItems: "center"
    },
    map: {
      ...StyleSheet.absoluteFillObject
    }
  });