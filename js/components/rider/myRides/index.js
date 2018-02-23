import * as Expo from 'expo';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Dimensions,
  BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Text,
  Button,
  Container,
  Tabs,
  Tab,
} from 'native-base';

import UpcomingRidesTab from './upcomingRidesTab';
import CompletedRidesTab from './completedRidesTab';

import { Actions } from 'react-native-router-flux';
import OctIcon from 'react-native-vector-icons/Octicons';

import { openDrawer } from '../../../actions/drawer';
import {
  fetchUserCurrentLocationAsync,
  fetchAddressFromCoordinatesAsync,
  currentLocation,
} from '../../../actions/rider/home';
import NavigationBar from '../../common/navigationBar';

import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
function mapStateToProps(state) {
  return {
    region: {
      latitude: state.rider.user.gpsLoc[0],
      longitude: state.rider.user.gpsLoc[1],
      latitudeDelta: state.rider.user.latitudeDelta,
      longitudeDelta: state.rider.user.latitudeDelta * aspectRatio,
    },
    pickUpAddress: state.rider.tripRequest.pickUpAddress,
    currentAddress: state.rider.user.address,
    mapRegion: state.rider.tripRequest.srcLoc,
  };
}
class MyRides extends Component {
  static propTypes = {
    changePageStatus: PropTypes.func,
    openDrawer: PropTypes.func,
    currentLocation: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      string: '',
      currentLatitude: '',
      currentLongitude: '',
    };
  }

  componentDidMount() {
    this.props.currentLocation();
  }
  setLocationClicked() {
    this.props.changePageStatus('confirmRide');
  }

  focusSearch = () => {
    this.searchInput._root.focus();
  };
  componentDidMount() {
    this.props.fetchAddressFromCoordinatesAsync(this.props.region);
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid());
  }
  async componentWillMount() {
    const status = await Expo.Permissions.getAsync(
      Expo.Permissions.REMOTE_NOTIFICATIONS,
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.backAndroid(),
    ); // Remove listener
  }
  backAndroid() {
    Actions.home(); // Return to previous screen
    return true; // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
  }
  render() {
    return (
      <Container style={styles.container}>
        <NavigationBar
          title="My Rides"
          hasTabs
          leftButtonIconName="menu"
          onLeftButtonPress={this.props.openDrawer}
          onRightButtonPress={this.props.openDrawer}
          rightButtonRenderer={() => (
            <Button transparent onPress={this.props.openDrawer}>
              <OctIcon
                style={{
                  color: commonColor.inverseTextColor,
                  fontSize: 26,
                }}
                name="gift"
              />
            </Button>
          )}
        />

        <Tabs>
          <Tab heading="Upcoming">
            <UpcomingRidesTab
              onPress={() => {
                Actions.rideDetails();
              }}
            />
          </Tab>
          <Tab heading="Completed">
            <CompletedRidesTab navigation={this.props.navigation} />
          </Tab>
        </Tabs>
        <View padder style={{ backgroundColor: '#fff' }}>
          <Button
            block
            onPress={() => {
              Actions.scheduleRide();
            }}
          >
            <Text>Schedule a Ride</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
function bindActions(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    fetchUserCurrentLocationAsync: () =>
      dispatch(fetchUserCurrentLocationAsync()),
    currentLocation: () => dispatch(currentLocation()),
    fetchAddressFromCoordinatesAsync: region =>
      dispatch(fetchAddressFromCoordinatesAsync(region)),
  };
}
export default connect(mapStateToProps, bindActions)(MyRides);
