import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Dimensions } from "react-native";
import { Icon } from "native-base";
import MapView from "react-native-maps";
import Polyline from "@mapbox/polyline";
import _ from "lodash";
import PropTypes from "prop-types";
import { updatePickupRegion } from "../../../services/ridersocket";
import { openDrawer } from "../../../actions/drawer";
import {
  fetchUserCurrentLocationAsync,
  changeRegion,
  clearTripAndTripRequest,
  changePageStatus,
  syncDataAsync,
  fetchAddressFromCoordinatesAsync
} from "../../../actions/rider/home";
import { clearReducerState } from "../../../actions/rider/receipt";
import { fetchFareDetail } from "../../../actions/rider/confirmRide";
import * as appStateSelector from "../../../reducers/rider/appState";
import * as userSelector from "../../../reducers/rider/user";
import Home from "../home";
import ConfirmRide from "../confirmRide";
import RideBooked from "../rideBooked";
import Receipt from "../receipt";
import styles from "./styles";

let that = null;
const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;
const markerIDs = ["dest", "src"];

function mapStateToProps(state) {
  return {
    region: {
      latitude: state.rider.user.gpsLoc[0],
      longitude: state.rider.user.gpsLoc[1],
      latitudeDelta: state.rider.user.latitudeDelta,
      longitudeDelta: state.rider.user.latitudeDelta * aspectRatio
    },
    tripRequest: state.rider.tripRequest,
    pickupLatitude: state.rider.tripRequest.srcLoc[0],
    pickupLongitude: state.rider.tripRequest.srcLoc[1],
    pageStatus: state.rider.appState.pageStatus,
    driverCurrentGpsLocLat: !state.rider.tripRequest.driver
      ? undefined
      : state.rider.tripRequest.driver.gpsLoc[0],
    driverCurrentGpsLocLong: !state.rider.tripRequest.driver
      ? undefined
      : state.rider.tripRequest.driver.gpsLoc[1],
    jwtAccessToken: state.rider.appState.jwtAccessToken,
    tripRequestStatus: state.rider.tripRequest.tripRequestStatus,
    tripStatus: state.rider.trip.tripStatus,
    user: state.rider.user,
    srcLoc: state.rider.tripRequest.srcLoc,
    destLoc: state.rider.tripRequest.destLoc,
    pickUpAddress: state.rider.tripRequest.pickUpAddress,
    destAddress: state.rider.tripRequest.destAddress,
    markers: appStateSelector.getMarkers(state),
    driversList: userSelector.getNearbyDriversLocation(state)
  };
}
class RootMapView extends Component {
  constructor(props) {
    super(props);
    this.map = null;
    this.state = {
      coords: []
    };
  }

  static propTypes = {
    pickupLatitude: PropTypes.number,
    pickupLongitude: PropTypes.number,
    driverCurrentGpsLocLat: PropTypes.number,
    driverCurrentGpsLocLong: PropTypes.number,
    jwtAccessToken: PropTypes.string,
    syncDataAsync: PropTypes.func,
    fetchAddressFromCoordinatesAsync: PropTypes.func,
    pageStatus: PropTypes.string,
    changeRegion: PropTypes.func,
    changePageStatus: PropTypes.func,
    tripRequestStatus: PropTypes.string,
    tripStatus: PropTypes.string,
    user: PropTypes.object,
    driversList: PropTypes.array,
    initialRegion: PropTypes.object,
    destLoc: PropTypes.array
  };
  componentWillMount() {
    that = this;
    if (this.props.tripRequestStatus === "request") {
      this.props.changePageStatus("confirmRide");
    } else {
      this.props.syncDataAsync(this.props.jwtAccessToken);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.destLoc[0] && nextProps.destLoc[0]) {
      this.setDestMap();
    }
  }
  setDestMap() {
    if (
      this.props.pageStatus === "confirmRide" &&
      this.props.destLoc[0] !== undefined
    ) {
      const gpsLoc = _.get(this.props, "tripRequest.destLoc", "user.gpsLoc");
      const obj = {
        latitude: gpsLoc[0],
        longitude: gpsLoc[1]
      };
      if (_.isEmpty(obj) === false) {
        this.map.fitToCoordinates([obj], {
          edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
          animated: true
        });
      }
    }
  }
  async showDirection(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${
          startLoc
        }&destination=${destinationLoc}`
      );
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let distance = respJson.routes[0].legs
        .map(leg => leg.distance.value)
        .reduce((a, c) => a + c);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      this.setState({ coords: coords });
    } catch (error) {
      console.log(error);
    }
  }
  onRegionChange(region) {
    this.setState({ region });
  }
  _renderNearByDrivers() {
    if (
      (this.props.pageStatus === "home" ||
        this.props.pageStatus === "confirmRide") &&
      this.props.driversList
    ) {
      return this.props.driversList.map((coordinate, index) => (
        <MapView.Marker key={index} coordinate={coordinate}>
          <View>
            <Icon name="ios-car" style={styles.carIcon} />
          </View>
        </MapView.Marker>
      ));
    }
    return <View />;
  }
  _renderRiderMarker() {
    if (
      this.props.tripStatus !== "onTrip" &&
      this.props.tripStatus !== "endTrip" &&
      this.props.pickupLatitude !== undefined
    ) {
      return (
        <MapView.Marker
          identifier="RiderMarker"
          coordinate={{
            latitude: this.props.pickupLatitude,
            longitude: this.props.pickupLongitude
          }}
        >
          <View>
            <Icon name="ios-pin" style={styles.pinIcon} />
          </View>
        </MapView.Marker>
      );
    }
    return <View />;
  }
  _renderDirectionLine() {
    if (
      this.props.pageStatus !== "home" &&
      this.props.pageStatus === "confirmRide" &&
      this.props.destLoc[0] !== undefined
    ) {
      this.showDirection(this.props.pickUpAddress, this.props.destAddress);
      // this.setDestMap();
      return (
        <MapView.Polyline
          coordinates={this.state.coords}
          strokeWidth={2}
          strokeColor="red"
        />
      );
    }
    if (
      this.props.pageStatus !== "home" &&
      this.props.pageStatus === "rideBooked" &&
      this.props.destLoc[0] !== undefined
    ) {
      this.showDirection(this.props.pickUpAddress, this.props.destAddress);
      // this.setCurrentMap();
      return (
        <MapView.Polyline
          coordinates={this.state.coords}
          strokeWidth={3}
          strokeColor="green"
        />
      );
    }
    return <View />;
  }
  _renderDriverMarker() {
    if (
      this.props.pageStatus !== "home" &&
      this.props.pageStatus !== "confirmRide" &&
      this.props.driverCurrentGpsLocLat !== undefined
    ) {
      return (
        <MapView.Marker
          identifier="DriverMarker"
          coordinate={{
            latitude: this.props.driverCurrentGpsLocLat,
            longitude: this.props.driverCurrentGpsLocLong
          }}
        >
          <View>
            <Icon name="ios-car" style={styles.carIcon} />
          </View>
        </MapView.Marker>
      );
    }
    return <View />;
  }

  _renderTripMarkers() {
    if (
      this.props.pageStatus !== "home" &&
      this.props.pageStatus === "confirmRide" &&
      this.props.tripRequest.destAddress
    ) {
      this.props.fetchFareDetail(this.props.tripRequest);
      // this.map.fitToSuppliedMarkers(markerIDs, true);
    } else {
      return <View />;
    }
  }

  _renderSrcMarker() {
    if (
      this.props.pageStatus !== "home" &&
      this.props.pageStatus === "confirmRide" &&
      this.props.destLoc[0] !== undefined
    ) {
      return (
        <MapView.Marker
          identifier="src"
          coordinate={{
            latitude: this.props.srcLoc[0],
            longitude: this.props.srcLoc[1]
          }}
        />
      );
    } else {
      return <View />;
    }
  }
  _renderDestMarker() {
    if (
      this.props.pageStatus !== "home" &&
      this.props.pageStatus === "confirmRide" &&
      this.props.destLoc[0] !== undefined
    ) {
      return (
        <MapView.Marker
          identifier="dest"
          coordinate={{
            latitude: this.props.destLoc[0],
            longitude: this.props.destLoc[1]
          }}
        />
      );
    } else {
      return <View />;
    }
  }

  render() {
    let component = null;
    switch (this.props.pageStatus) {
      case "home":
        component = <Home />;
        break;
      case "confirmRide":
        component = <ConfirmRide />;
        break;
      case "rideBooked":
        component = <RideBooked />;
        break;
      case "receipt":
        component = <Receipt />;
        break;
      default:
        component = <Home />;
    }
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style={styles.map}
          showsUserLocation={true}
          // followsUserLocation
          initialRegion={this.props.initialRegion}
          onRegionChangeComplete={region => {
            if (
              this.props.pageStatus === "home"
              // || this.props.pageStatus === "confirmRide"
            ) {
              updatePickupRegion(this.props.user, region); // socket call
              this.props.changeRegion(region);
              this.props.fetchAddressFromCoordinatesAsync(region);
            }
          }}
        >
          {this._renderDestMarker()}
          {this._renderDriverMarker()}

          {this._renderRiderMarker()}
          {this._renderNearByDrivers()}
          {this._renderDirectionLine()}
        </MapView>
        {component}
      </View>
    );
  }
}
function bindActions(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    fetchUserCurrentLocationAsync: () =>
      dispatch(fetchUserCurrentLocationAsync()),
    changeRegion: region => dispatch(changeRegion(region)),
    fetchAddressFromCoordinatesAsync: region =>
      dispatch(fetchAddressFromCoordinatesAsync(region)),
    clearTripAndTripRequest: () => dispatch(clearTripAndTripRequest()),
    changePageStatus: newPage => dispatch(changePageStatus(newPage)),
    syncDataAsync: jwtAccessToken => dispatch(syncDataAsync(jwtAccessToken)),
    clearReducerState: () => dispatch(clearReducerState()),
    fetchFareDetail: tripCoordinates =>
      dispatch(fetchFareDetail(tripCoordinates))
  };
}

function setCurrentMap() {
  const gpsLoc = that.props.user.gpsLoc;
  const obj = {
    latitude: gpsLoc[0],
    longitude: gpsLoc[1]
  };
  that.map.fitToCoordinates([obj], {
    edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
    animated: true
  });
}

export { setCurrentMap };
export default connect(mapStateToProps, bindActions)(RootMapView);
