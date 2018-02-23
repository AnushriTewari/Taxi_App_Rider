import React, { Component } from 'react';
import { StatusBar, BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import { Drawer } from 'native-base';
import PropTypes from 'prop-types';
import { getAppConfig } from './actions/appConfig';

import { closeDrawer } from './actions/drawer';
import Login from './components/common/login/';
import SignIn from './components/common/signIn/';
import Register from './components/common/register/';
import RiderStartupService from './components/rider/startupServices';
import ScheduleRide from './components/rider/scheduleRide';
import AddPickup from './components/rider/scheduleRide/addPickup';
import AddDropoff from './components/rider/scheduleRide/addDropoff';
import ConfirmRide from './components/rider/scheduleRide/confirmRide';
import RideDetails from './components/rider/rideDetails';
import RideMap from './components/rider/rideMap';
import DriverDetails from './components/rider/driverDetails';
import RootMapView from './components/rider/rootMapView';
import Home from './components/rider/home/';
import SuggestLocation from './components/rider/suggestLocation/';
import SideBar from './components/rider/sideBar';
import Payment from './components/rider/payment';
import History from './components/rider/history';
import Notifications from './components/rider/notifications';
import Settings from './components/rider/settings';
import ManagePassenger from './components/rider/manageRider';
import CardPayment from './components/rider/cardPayment';
import CreditCardq from './components/rider/creditCard';
import SaveCards from './components/rider/saveCards';
import PaymentDetails from './components/rider/paymentDetails';
import PaymentConfirm from './components/rider/paymentConfirm';
/* import ConfirmRide from "./components/rider/confirmRide"; */
import RideBooked from './components/rider/rideBooked';
import Receipt from './components/rider/receipt';
import { statusBarColor } from './themes/base-theme';
import Verify from './components/common/register/otpverification'

const RouterWithRedux = connect()(Router);

class AppNavigator extends Component {
  static propTypes = {
    drawerState: PropTypes.object,
    closeDrawer: PropTypes.func,
    riderJwtAccessToken: PropTypes.string,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.drawerState.drawerState === 'opened') {
      this._drawer._root.open();
    } else if (nextProps.drawerState.drawerState === 'closed') {
      this._drawer._root.close();
    }
  }
  componentWillMount() {
    this.props.getAppConfig();
  }
  openDrawer() {
    this._drawer._root.open();
  }
  closeDrawer() {
    if (this.props.drawerState === 'opened') {
      this.props.closeDrawer();
    }
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid()); // Listen for the hardware back button on Android to be pressed
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.backAndroid(),
    ); // Remove listener
  }

  backAndroid() {
    if (Actions.state.index === 0) {
      return false;
    }
    Actions.pop();
    return true;
  }
  render() {
    return (
      <Drawer
        ref={ref => {
          this._drawer = ref;
        }}
        type="overlay"
        content={<SideBar navigator={this._navigator} />}
        tapToClose
        acceptPan={false}
        onClose={() => this.closeDrawer()}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
      >
        <StatusBar backgroundColor={statusBarColor} />
        <RouterWithRedux>
          <Stack key="root" hideNavBar>
            <Scene
              key="login"
              component={Login}
              hideNavBar
              initial={!this.props.riderJwtAccessToken ? true : false}
            />
            <Scene key="signIn" component={SignIn} />
            <Scene key="register" component={Register} />
            <Scene key="otpverification" component={Verify} />

            <Scene
              key="riderStartupService"
              component={RiderStartupService}
              hideNavBar
              initial={this.props.riderJwtAccessToken}
            />

            <Scene key="rootMapView" component={RootMapView} />
            <Scene key="home" component={Home} />
            {/* <Scene key="confirmRide" component={ConfirmRide} /> */}
            <Scene key="rideBooked" component={RideBooked} />

            <Stack key="scheduleRide" hideNavBar>
              <Scene key="_scheduleRide" component={ScheduleRide} />
              <Scene key="addPickup" component={AddPickup} />
              <Scene key="addDropoff" component={AddDropoff} />
              <Scene key="confirmRide" component={ConfirmRide} />
            </Stack>

            <Scene key="rideDetails" component={RideDetails} />
            <Scene key="rideMap" component={RideMap} />
            <Scene key="driverDetails" component={DriverDetails} />

            <Scene key="sideBar" component={SideBar} />
            <Scene
              key="suggestLocation"
              component={SuggestLocation}
              hideNavBar
            />
            <Scene key="payment" component={Payment} />
            <Scene key="history" component={History} />
            <Scene key="notifications" component={Notifications} />
            <Scene key="settings" component={Settings} />
            <Scene key="manageRider" component={ManagePassenger} />
            <Scene key="cardPayment" component={CardPayment} />
            <Scene key="creditCardq" component={CreditCardq} />
            <Scene key="saveCards" component={SaveCards} />
            <Scene key="paymentDetails" component={PaymentDetails} />
            <Scene key="paymentConfirm" component={PaymentConfirm} />
            <Scene key="receipt" component={Receipt} />
          </Stack>
        </RouterWithRedux>
      </Drawer>
    );
  }
}
function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    getAppConfig: () => dispatch(getAppConfig()),
  };
}
const mapStateToProps = state => ({
  drawerState: state.drawer,
  riderApproved: state.rider.user.isApproved,
  riderJwtAccessToken: state.rider.appState.jwtAccessToken,
});

export default connect(mapStateToProps, bindAction)(AppNavigator);
