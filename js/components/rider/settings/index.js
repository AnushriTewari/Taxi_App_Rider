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
  Tabs,
  Tab,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import NavigationBar from '../../common/navigationBar';
import SettingsForm from './form';
import RidersTab from './ridersTab';
import {
  updateUserProfileAsync,
  updateUserProfilePicAsync,
} from '../../../actions/rider/settings';

import styles from './styles';

export interface Props {
  userDetails: {};
  profileUrl: string;
  fname: string;
  lname: string;
  email: string;
  phoneNo: string;
  profileUrl: string;
  profileUpdating: boolean;
  riders: Array;
}
export interface StoreState {
  rider: {
    appState: {jwtAccessToken: string};
    user: {
      fname: string;
      lname: string;
      email: string;
      phoneNo: string;
      profileUrl: string;
      profileUpdating: boolean;
      riders: Array;
    }
  }
}

interface State {
  submit: boolean;
  image: ?string;
}


function mapStateToProps(state: StoreState) {
  return {
    jwtAccessToken: state.rider.appState.jwtAccessToken,
    fname: state.rider.user.fname,
    lname: state.rider.user.lname,
    email: state.rider.user.email,
    phoneNo: state.rider.user.phoneNo,
    profileUrl: state.rider.user.profileUrl,
    userDetails: state.rider.user,
    profileUpdating: state.rider.user.profileUpdating,
    riders: state.rider.user.riders || []
  };
}


class Settings extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      submit: false,
      image: undefined,
    };
  }
  _pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });
    if (!result.cancelled) {
      this.setState({ image: result.uri });
      const userData = {
        ...this.props.userDetails,
        localUrl: result.uri,
      };
      this.props.updateUserProfilePicAsync(userData, 'profile');
    } else {
      this.setState({ image: this.props.profileUrl });
    }
  };

  handleRiderSelect (rider) {
    Actions.manageRider(rider);
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#fff' }}>
      <NavigationBar
          title="Settings"
          hasTabs
          back
          onLeftButtonPress={() => Actions.pop()}
        />

        <Tabs styles={{ flex: 1 }}>
          <Tab heading="Allison">
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
              <SettingsForm
                phoneNo={this.props.phoneNo.substr(3, 12)}
                code={this.props.phoneNo.substr(0, 3)}
              />
            </Content>
          </Tab>
          <Tab heading="Riders">
            <RidersTab riders={this.props.riders} onSelect={this.handleRiderSelect} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    updateUserProfileAsync: userDetails =>
      dispatch(updateUserProfileAsync(userDetails)),
    updateUserProfilePicAsync: (userData, type) =>
      dispatch(updateUserProfilePicAsync(userData, type)),
  };
}

export default connect(mapStateToProps, bindActions)(Settings);
