import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  Content,
  Text,
  Container,
  Icon,
} from 'native-base';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
let moment = require('moment');
if ('default' in moment) {
  moment = moment.default;
}
import NavigationBar from '../../common/navigationBar';

import styles from './styles';

class RideMap extends Component {
  state = {
    destCoords: {
      latitude: -37.734656,
      longitude: 144.9631,
    },
    driverCoords: {
      latitude: -37.734529,
      longitude: 144.916816,
    },
  };
  componentDidMount = () => {
    setTimeout(() => {
      this.map.fitToCoordinates(
        [this.state.destCoords, this.state.driverCoords],
        {
          edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
        },
      );
    }, 1000);
  };

  regionFrom(lat, lon, distance) {
    distance = distance / 2;
    const circumference = 40075;
    const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
    const angularDistance = distance / circumference;

    const latitudeDelta = distance / oneDegreeOfLatitudeInMeters;
    const longitudeDelta = Math.abs(
      Math.atan2(
        Math.sin(angularDistance) * Math.cos(lat),
        Math.cos(angularDistance) - Math.sin(lat) * Math.sin(lat),
      ),
    );

    return {
      latitude: lat,
      longitude: lon,
      latitudeDelta,
      longitudeDelta,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.regionFrom(
            this.state.destCoords.latitude,
            this.state.destCoords.longitude,
            10000,
          )}
          ref={ref => {
            this.map = ref;
          }}
          style={styles.map}
        >
          <MapView.Marker
            identifier="dest"
            coordinate={this.state.driverCoords}
          >
            <View>
              <Icon name="ios-pin" style={styles.pickupPinIcon} />
            </View>
          </MapView.Marker>
          <MapView.Marker
            identifier="DriverMarker"
            coordinate={{
              latitude: -37.734656,
              longitude: 144.9631,
            }}
          >
            <View>
              <Icon name="ios-car" style={styles.carIcon} />
            </View>
          </MapView.Marker>
        </MapView>
        <Container pointerEvents="box-none">
          <NavigationBar
            title={'FRIDAY 22 FEB 2018'}
            back
            onLeftButtonPress={() => Actions.pop()}
            onRightButtonPress={() => Actions.pop()}
            rightButtonText={'Info'}
          />

          <View style={styles.ridePending}>
            <Text style={{backgroundColor: '#fff', color: '#000'}}>We’ll notify you as soon as we’ve found you a driver</Text>
          </View>
          <Content>
            <View />
          </Content>
        </Container>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.rider.user.email,
    loader: state.rider.rideCardPayment.loadSpinner,
    paymentData: state.rider.rideCardPayment.paymentData,
  };
}

function bindActions(dispatch) {
  return {
    payment: data => dispatch(payment(data)),
  };
}

export default connect(mapStateToProps, bindActions)(RideMap);
