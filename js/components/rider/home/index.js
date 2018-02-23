import * as Expo from "expo";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  BackHandler
} from "react-native";
import _ from "lodash";
import PropTypes from "prop-types";
import Modal from "react-native-modalbox";
import {
  Header,
  Text,
  Button,
  Icon,
  Card,
  Title,
  Item,
  Input,
  List,
  ListItem,
  Left,
  Right,
  Body,
  CardItem,
  Grid,
  Col,
  Row
} from "native-base";
import { Actions, ActionConst } from "react-native-router-flux";
import OctIcon from "react-native-vector-icons/Octicons";

import { openDrawer } from "../../../actions/drawer";
import * as viewSelector from "../../../reducers/viewStore";
import {
  setSourceLocation,
  fetchPrediction,
  changeRegion,
  changePageStatus,
  fetchUserCurrentLocationAsync,
  fetchAddressFromCoordinatesAsync,
  currentLocation
} from "../../../actions/rider/home";
import styles from "./styles";
import commonColor from "../../../../native-base-theme/variables/commonColor";

const { width, height } = Dimensions.get("window");
const aspectRatio = width / height;
function mapStateToProps(state) {
  return {
    region: {
      latitude: state.rider.user.gpsLoc[0],
      longitude: state.rider.user.gpsLoc[1],
      latitudeDelta: state.rider.user.latitudeDelta,
      longitudeDelta: state.rider.user.latitudeDelta * aspectRatio
    },
    pickUpAddress: state.rider.tripRequest.pickUpAddress,
    currentAddress: state.rider.user.address,
    mapRegion: state.rider.tripRequest.srcLoc
  };
}
class Home extends Component {
  static propTypes = {
    changePageStatus: PropTypes.func,
    openDrawer: PropTypes.func,
    currentLocation: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = {
      uberPoolSelect: true,
      uberGoSelect: false,
      uberXSelect: false,
      uberXLSelect: false,
      string: "",
      currentLatitude: "",
      currentLongitude: ""
    };
    this.uberPool = this.uberPool.bind(this);
    this.uberGo = this.uberGo.bind(this);
    this.uberX = this.uberX.bind(this);
    this.uberXL = this.uberXL.bind(this);
  }

  componentDidMount() {
    this.props.currentLocation();
  }
  setLocationClicked() {
    this.props.changePageStatus("confirmRide");
  }

  uberPool() {
    this.setState({
      uberPoolSelect: true,
      uberXLSelect: false,
      uberXSelect: false,
      uberGoSelect: false
    });
  }
  uberGo() {
    this.setState({
      uberPoolSelect: false,
      uberXLSelect: false,
      uberXSelect: false,
      uberGoSelect: true
    });
  }
  uberX() {
    this.setState({
      uberPoolSelect: false,
      uberXLSelect: false,
      uberXSelect: true,
      uberGoSelect: false
    });
  }
  uberXL() {
    this.setState({
      uberPoolSelect: false,
      uberXLSelect: true,
      uberXSelect: false,
      uberGoSelect: false
    });
  }
  focusSearch = () => {
    this.refs.searchInput._root.focus();
  };
  componentDidMount() {
    this.props.fetchAddressFromCoordinatesAsync(this.props.region);
    BackHandler.addEventListener("hardwareBackPress", () => this.backAndroid());
  }
  async componentWillMount() {
    const status = await Expo.Permissions.getAsync(
      Expo.Permissions.REMOTE_NOTIFICATIONS
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", () =>
      this.backAndroid()
    ); // Remove listener
  }
  backAndroid() {
    Actions.home(); // Return to previous screen
    return true; // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
  }
  render() {
    return (
      <View pointerEvents="box-none" style={{ flex: 1 }}>
        <View style={styles.locateIcon}>
          <Col>
            <Row style={Platform.OS === "ios" ? { top: -5 } : { top: -5 }}>
              <TouchableOpacity
                style={{ flexDirection: "row", flex: 1 }}
                onPress={() => this.props.currentLocation()}
              >
                <Icon
                  name="ios-locate-outline"
                  style={{ fontSize: 40, color: commonColor.brandPrimary }}
                />
              </TouchableOpacity>
            </Row>
          </Col>
        </View>
        <View style={styles.slideSelector}>
          <Button
            style={{
              flex: 1,
              backgroundColor: "#2E6894",
              borderRadius: 0,
              height: 50
            }}
            block
            large
            onPress={() => {
              // Actions.confirmRide();
              this.setLocationClicked();
            }}
          >
            <Text style={{ color: "#ddd", fontSize: 18, fontWeight: "500" }}>
              Schedule a ride
            </Text>
          </Button>
        </View>
        <View style={styles.headerContainer} pointerEvents="box-none">
          <Header
            iosStatusbar="light-content"
            style={Platform.OS === "ios" ? styles.iosHeader : styles.aHeader}
            androidStatusBarColor={commonColor.statusBarLight}
          >
            <Left>
              <Button transparent onPress={this.props.openDrawer}>
                <Icon
                  name="ios-menu"
                  style={{ color: commonColor.brandPrimary }}
                />
              </Button>
            </Left>
            <Body style={{ flex: 3 }}>
              <Title style={{ color: commonColor.brandPrimary, marginTop: -2 }}>
                Merry Go Drive
              </Title>
            </Body>
            <Right>
              <Button transparent onPress={this.props.openDrawer}>
              <OctIcon
                      style={{
                        color: "#444",
                        fontSize: 26
                      }}
                      name="gift"
                    />
              </Button>
            </Right>
          </Header>
          <Card
            style={
              Platform.OS === "ios" ? styles.iosSearchBar : styles.aSearchBar
            }
          >
            <Grid>
              <Col style={{}}>
                <Row
                  style={
                    Platform.OS === "ios"
                      ? { paddingLeft: 10, marginBottom: 8 }
                      : { paddingLeft: 10, left: -8 }
                  }
                >
                  <Text
                    style={{
                      ...styles.SearchPickText,
                      fontWeight: "bold",
                      marginBottom: 5
                    }}
                  >
                    Pickup Location
                  </Text>
                </Row>
                <Row
                  style={
                    Platform.OS === "android"
                      ? { marginTop: -20, left: -10 }
                      : { marginTop: -30, paddingLeft: 5, left: -10 }
                  }
                >
                  <Item
                    style={
                      Platform.OS === "android"
                        ? {
                            flex: 1,
                            alignItems: "center",
                            borderColor: "transparent",
                            paddingBottom: 5
                          }
                        : {
                            flex: 1,
                            alignItems: "center",
                            borderColor: "transparent",
                            paddingTop: 7
                          }
                    }
                  >
                    <Input
                      ref="searchInput"
                      placeholder="Enter Pickup Location"
                      onFocus={() => {
                        Actions.suggestLocation({
                          heading: "Starting Location",
                          page: "home"
                        });
                      }}
                      value={_.get(this.props, "currentAddress", "")}
                      editable={false}
                      placeholderTextColor={commonColor.lightThemePlaceholder}
                      style={{
                        top: Platform.OS === "ios" ? -10 : 2,
                        fontSize: 15,
                        marginHorizontal: 10,
                      }}
                    />
                  </Item>
                </Row>
              </Col>
            </Grid>
          </Card>
        </View>
        <View style={styles.setPickupLocation}>
          <Card
            style={{
              width: width / 2,
              flexDirection: "row",
              alignSelf: "center"
            }}
          >
            <CardItem
              style={{
                flex: 2.5,
                paddingTop: 7,
                paddingBottom: 7,
                paddingLeft: 10,
                flexDirection: "row",
                justifyContent: "center",
                borderTopRightRadius: 4,
                borderBottomRightRadius: 4
              }}
            >
              <Text
                style={{
                  color: "#A5ADB4",
                  fontWeight: "500",
                  alignItems: "center"
                }}
              >
                Set Pickup Location
              </Text>
            </CardItem>
            <View style={styles.triangle} />
          </Card>
        </View>
      </View>
    );
  }
}
function bindActions(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    setSourceLocation: () => dispatch(setSourceLocation()),
    changeRegion: region => dispatch(changeRegion(region)),
    changePageStatus: newPage => dispatch(changePageStatus(newPage)),
    fetchUserCurrentLocationAsync: () =>
      dispatch(fetchUserCurrentLocationAsync()),
    currentLocation: () => dispatch(currentLocation()),
    fetchAddressFromCoordinatesAsync: region =>
      dispatch(fetchAddressFromCoordinatesAsync(region))
  };
}
export default connect(mapStateToProps, bindActions)(Home);
