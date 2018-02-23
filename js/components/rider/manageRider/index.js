import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { ImagePicker } from 'expo';
import {
  Container,
  Content,
  Thumbnail,
  Item,
  Body,
  Spinner,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import NavigationBar from '../../common/navigationBar';

import PassengerForm from './form';
import {
  addPassenger,
  updatePassengerDetails,
  removePassenger,
} from '../../../actions/rider/passenger';

import styles from './styles';

function mapStateToProps(state) {
  return {
    jwtAccessToken: state.rider.appState.jwtAccessToken,
    fname: state.rider.user.fname,
    lname: state.rider.user.lname,
    email: state.rider.user.email,
    phoneNo: state.rider.user.phoneNo,
    profileUrl: state.rider.user.profileUrl,
    userDetails: state.rider.user,
    profileUpdating: state.rider.user.profileUpdating,
  };
}
class ManagePassenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
      image: null,
    };
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      let userData = Object.assign(this.props.userDetails, {
        localUrl: result.uri,
      });
      this.props.updateUserProfilePicAsync(userData, 'profile');
    } else {
      this.setState({ image: this.props.profileUrl });
    }
  };
  render() {
    return (
      <Container style={styles.container}>
        <NavigationBar
          title="Rider"
          back
          onLeftButtonPress={() => Actions.pop()}
        />
        <Content>
          <Body style={{ alignItems: 'center', marginTop: 20 }}>
            <Item onPress={this._pickImage}>
              {this.props.profileUpdating ? (
                <View
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Spinner />
                </View>
              ) : (
                <Thumbnail
                  source={{ uri: this.props.profileUrl }}
                  style={{ width: 70, height: 70, borderRadius: 35 }}
                />
              )}
              <View
                style={{
                  backgroundColor: 'white',
                  position: 'absolute',
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  right: 0,
                  bottom: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <FAIcon
                  style={{
                    color: '#444',
                    fontSize: 18,
                  }}
                  name="pencil"
                />
              </View>
            </Item>
          </Body>
          <PassengerForm
          />
        </Content>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    addPassenger: passengerDetails => dispatch(addPassenger(passengerDetails)),
    updatePassengerDetails: passengerDetails =>
      dispatch(updatePassengerDetails(passengerDetails)),
    removePassenger: passengerDetails =>
      dispatch(removePassenger(passengerDetails)),
  };
}

export default connect(mapStateToProps, bindActions)(ManagePassenger);
