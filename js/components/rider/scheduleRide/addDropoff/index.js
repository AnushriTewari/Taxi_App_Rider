/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Switch } from 'react-native';
import {
  Content,
  Input,
  Text,
  Item,
  Button,
  Right,
  Container,
  Form,
  InputGroup,
  Label,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
let moment = require('moment');
if ('default' in moment) {
  moment = moment.default;
}

import NavigationBar from '../../../common/navigationBar';
import AutoResizingTextInput from '../../../common/autoResizingTextInput';

import styles from './styles';

export interface Props {
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
    }
  }
}

interface State {
}

class AddDropoff extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      address:''
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.destAddress) {
      this.setState({ address: nextProps.destAddress })
    }
  }
  render() {
    return (
      <Container style={styles.container}>
        <NavigationBar
          title="Add Dropoff"
          back
          onLeftButtonPress={() => Actions.pop()}
        />
        <Content padder>
          <Form style={styles.form}>
          <Item
              stackedLabel
              onPress={() => Actions.suggestLocation({heading: 'Add Dropoff'})}
              style={{ minHeight: 55, marginLeft: 0, paddingLeft: 5,alignItems:'flex-start' }}
              >
              <Label style={{ fontSize:17,fontWeight:'600' }}>Dropoff Address</Label>
              <Text
              placeholder='red'
              adjustsFontSizeToFit minimumFontScale={1}
              numberOfLines={3}
              style={{
                fontWeight: '400',
                marginLeft: 5,
                marginTop: "3%"
              }}
            >
              {this.state.address ? this.state.address : null}
            </Text>
          </Item>

            <InputGroup error={false} style={{minHeight: 40}}>
              <Label>Sign-in Rider At Dropoff?</Label>
              <Right>
                <Switch />
              </Right>
            </InputGroup>

            <Item stackedLabel error={false} style={{marginLeft: 0, paddingLeft: 5}}>
              <Label style={{color: '#000'}}>Dropoff Instructions</Label>
              <AutoResizingTextInput placeholder="e.g. make sure they call when home" />
            </Item>
          </Form>
          <View padder style={{ backgroundColor: '#fff' }}>
            <Button
              block
              style={styles.nextButton}
              onPress={() => {
                Actions.confirmRide();
              }}
            >
              <Text>Next</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    userEmail: state.rider.user.email,
    loader: state.rider.rideCardPayment.loadSpinner,
    destAddress: state.rider.tripRequest.destAddress
  };
}

function bindActions(dispatch) {
  return {
    payment: data => dispatch(payment(data)),
  };
}

export default connect(mapStateToProps, bindActions)(AddDropoff);
