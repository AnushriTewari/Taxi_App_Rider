import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Platform,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
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
  Grid,
  Col,
  Row,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { fetchPrediction, changeRegion } from '../../../actions/rider/home';
import {
  setSrcAddress,
  setDestAddress,
  fetchCoordinatesFromAddress,
  fetchCoordinatesFromAddressAsync,
  fetchFareDetail,
} from '../../../actions/rider/confirmRide';
import {
  setHomeAddress,
  setWorkAddress,
} from '../../../actions/rider/settings';
import styles from './styles';
import commonColor from '../../../../native-base-theme/variables/commonColor';
import { GooglePlacesAutocomplete, } from 'react-native-google-places-autocomplete';
import NavigationBar from '../../common/navigationBar';

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
    tripRequest: state.rider.tripRequest,
    predictionArray: state.viewStore.predictionArray,
    homeAddress: state.rider.user.homeAddress,
    workAddress: state.rider.user.workAddress,
  };
}
class SuggestLocation extends Component {
  static propTypes = {
    changePageStatus: PropTypes.func,
    openDrawer: PropTypes.func,
    fetchPrediction: PropTypes.func,
    predictionArray: PropTypes.array,
    currentLocation: PropTypes.func,
    fetchFareDetail: PropTypes.func,
    pickupButtonVisibility: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = {
      string: '',
      currentLatitude: '',
      currentLongitude: '',
      // modalStatus: false,
      // modalVisible: false,
    };
  }
  _append(text) {
    this.setState({
      string: text,
    });
    this.props.fetchPrediction(text);
  }
  setAddress(fetchedAddress) {
    if (this.props.page === 'home') {
      this.props.setSrcAddress(fetchedAddress);
      this.props.fetchCoordinatesFromAddressAsync(fetchedAddress);
      if (!this.props.tripRequest.destLoc.length) {
        this.props.fetchFareDetail(this.props.tripRequest);
      }
    }
    if (this.props.page === 'destination') {
      this.props.setDestAddress(fetchedAddress);
      this.props.fetchCoordinatesFromAddress(fetchedAddress);
      this.props.fetchFareDetail(this.props.tripRequest);
    }

    if (this.props.page === 'HomeAddress') {
      this.props.setHomeAddress(fetchedAddress);
    }

    if (this.props.page === 'WorkAddress') {
      this.props.setWorkAddress(fetchedAddress);
    }
    Actions.pop({
      address: fetchedAddress,
    });
  }

  setHomePlace(text){
    Actions.pop();
    if(this.props.heading==="Add Pickup"){
    this.props.setSrcAddress("Home");
    }
    else if(this.props.heading==="Add Dropoff"){
    this.props.setDestAddress("Home");
    }
  }
 
  setWorkPlace(text){
    Actions.pop();
    if(this.props.heading==="Add Pickup"){
      this.props.setSrcAddress("Work")
      }
      else if(this.props.heading==="Add Dropoff"){
        this.props.setDestAddress("Work")
      }
    
  }
  // setAddress(text){
  //   Actions.pop();

  // }
  setTextAddress(text){
    Actions.pop()
    if(this.props.heading==="Add Pickup"){
    this.props.setSrcAddress(text)
    }
    else if(this.props.heading==="Add Dropoff"){
      this.props.setDestAddress(text)
    }
  }

 
  render() {
    return (
      <View style={{ flex: 1 }}>
       <NavigationBar
          title="Search Location"
          back
          onLeftButtonPress={() => Actions.pop()}
        />
        {this.state.string.length !== 0 ? (
          <View style={{ margin: 14, marginTop: 90}}>
            <List style={{ backgroundColor: 'white' }}>   
              {this.props.predictionArray.map((item, index) => (
                <ListItem
                  key={index}
                  button
                ><TouchableOpacity onPress={() =>  this.setTextAddress(item.description)}>
                  <Text style={{ fontSize: 14 }}>{item.description}</Text>
                  </TouchableOpacity>
                </ListItem>
               ))
           } 
            </List>
          </View> 
          ):(
          <View style={{ margin: 14, marginTop: 90}}>
            {this.props.page === 'HomeAddress' ||
            this.props.page === 'WorkAddress' ? null : (
              <List style={{ backgroundColor: 'white' }}>
                {this.props.homeAddress !== null ? (
                  <ListItem
                    button
                    onPress={() => this.setAddress(this.props.homeAddress)}
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                    }}
                  >
                   <TouchableOpacity style={{width:"100%"}} onPress={()=>this.setHomePlace()}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}
                    >
                      <Icon name="ios-home" style={{ fontSize: 30 }} />
                      <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>
                        Home
                      </Text>
                    </View>
                    <Text style={{ fontSize: 14, alignSelf: 'flex-start' }}>
                      {this.props.homeAddress}
                    </Text>
                    </TouchableOpacity>
                  </ListItem>
                ) : null}
                {this.props.workAddress !== null ? (
                  <ListItem
                    button
                    onPress={() => this.setAddress(this.props.workAddress)}
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                    }}
                  >
                   <TouchableOpacity style={{width:"100%"}} onPress={()=>this.setWorkPlace()}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}
                    > 
                      <Icon name="ios-home" style={{ fontSize: 30 }} />
                      <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>
                        Work
                      </Text>
                    </View>
                    <Text style={{ fontSize: 14, alignSelf: 'flex-start' }}>
                      {this.props.workAddress}
                    </Text>
                    </TouchableOpacity>
                  </ListItem>
                ) : null}
              </List>
            )}
          </View>
        )
        }
        <View style={styles.headerContainer} pointerEvents="box-none">
          {/* <Header
            iosStatusbar="light-content"
            style={Platform.OS === 'ios' ? styles.iosHeader : styles.aHeader}
            androidStatusBarColor={commonColor.statusBarLight}
          >
             <Left> 
               <Button transparent onPress={() => {
                if(this.props.heading==="Home Address"){
                  Actions.pop();
                  this.props.setHomeAddress(this.state.string)
                }
                 else if(this.props.heading==="Work Address"){
                  Actions.pop();
                  this.props.setWorkAddress(this.state.string)
                 }
                 else if(this.props.heading==="Search Location"){
                  Actions.pop();
                  this.props.setSrcAddress(this.state.string)
                 }
                else if(this.state.string.length !== 0){
                  this.props.setSrcAddress(this.state.string)
                }
                else{
                  Actions.pop();                }
                }}>
                <Icon
                  name="md-arrow-back"
                  style={{ fontSize: 28, color: commonColor.brandPrimary }}
                />
              </Button>
            </Left>  
             <Body style={{ flex: 2 }}> 
               <Title
                style={{
                  color: commonColor.brandPrimary,
                  marginTop: -2,
                  fontSize: 16,
                }}
              >
                {_.get(this.props, 'heading', 'Search Location')}
              </Title> 
             </Body> 
           <Right />
         </Header> */}
           <Card
            style={
              Platform.OS === 'ios' ? styles.iosSearchBar : styles.aSearchBar
            }
          >
            <Grid>
              <Col size={1} style={{ padding: 15 }}>
                <TouchableOpacity onPress={() => this.focusSearch()}>
                  <Icon name="ios-search" style={{ fontSize: 20 }} />
                </TouchableOpacity>
              </Col>
              <Col
                size={4}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: -120,
                }}
              >
                <Row
                  style={
                    Platform.OS === 'android'
                      ? { marginTop: -20, left: -10 }
                      : { marginTop: -30, padding: 5, left: -10 }
                  }
                > 
                   <Item
                    regular
                    style={
                      Platform.OS === 'android'
                        ? {
                            flex: 1,
                            alignItems: 'center',
                            borderColor: 'transparent',
                            paddingBottom: 5,
                          }
                        : {
                            flex: 1,
                            alignItems: 'center',
                            borderColor: 'transparent',
                          }
                    }
                  >
                    <Input
                      ref={ref => {this.searchInput = ref;}}
                      placeholder="Search for locality or place"
                      autoFocus
                      onChangeText={text => this._append(text)}
                      value={this.state.string}
                      placeholderTextColor={commonColor.lightThemePlaceholder}
                      style={{
                        top: Platform.OS === 'ios' ? 15 : 10,
                        fontSize: 15,
                        paddingLeft: 50,
                      }}
                    /> 
                  </Item>
                </Row>
              </Col>
            </Grid>
          </Card> 
         
        </View>
      </View>
    );
  }
}



function bindActions(dispatch) {
  return {
    changeRegion: region => dispatch(changeRegion(region)),
    fetchPrediction: string => dispatch(fetchPrediction(string)),
    fetchCoordinatesFromAddressAsync: fetchedAddress =>
      dispatch(fetchCoordinatesFromAddressAsync(fetchedAddress)),
    fetchCoordinatesFromAddress: fetchedAddress =>
      dispatch(fetchCoordinatesFromAddress(fetchedAddress)),
    setSrcAddress: fetchedAddress => dispatch(setSrcAddress(fetchedAddress)),
    setDestAddress: fetchedAddress => dispatch(setDestAddress(fetchedAddress)),
    setHomeAddress: homeAddress => dispatch(setHomeAddress(homeAddress)),
    setWorkAddress: workAddress => dispatch(setWorkAddress(workAddress)),
    fetchFareDetail: tripRequest => dispatch(fetchFareDetail(tripRequest)),
  };
}
export default connect(mapStateToProps, bindActions)(SuggestLocation);
