import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Alert,
} from 'react-native';
import {
  Content,
  Text,
  List,
  Button,
  Right,
  Container,
  Left,
  Icon,
  H3,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
let moment = require('moment');
if ('default' in moment) {
  moment = moment.default;
}

import NavigationBar from '../../../common/navigationBar';
import RiderButtonGroup from '../../riderButtonGroup';

import styles from './styles';

class ConfirmRide extends Component {
  state = {
    promoCode: null,
    pickup: {
      time: '8:30 AM',
      title: 'Pickup',
      address: 'Home',
      signRequired: false,
      instructions: 'honk horn',
    },
    dropoff: {
      time: 'est 8:45 AM',
      title: 'Dropoff',
      address: 'School',
      signRequired: true,
      instructions: 'office is in the front',
    },
    riders: [
      {
        fName: 'Katie',
        lName: 'Maple',
        imageUri:
          'http://res.cloudinary.com/merry-go-drive/image/upload/v1515345310/ytxrbzdx9beq1cgeo4x1.jpg',
      },
    ],
  };

  renderWaypoint(item) {
    return (
      <View style={{ marginTop: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text>{item.time}</Text>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <View style={styles.row}>
            <Text style={{}}>{item.address}</Text>
          </View>
          {item.signRequired && (
            <View style={styles.row}>
              <Text style={{}} note>
                SIGN IN Required
              </Text>
            </View>
          )}
          <View style={styles.row}>
            <Text style={{}} note>
              {item.instructions}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <Container style={styles.container}>
        <NavigationBar
          title="Confirm Ride"
          back
          onLeftButtonPress={() => Actions.pop()}
        />
        <Content padder>
          <H3 style={styles.heading}>FRIDAY 22 FEB 2018</H3>
          <RiderButtonGroup riders={this.state.riders} />
          <View>
            <List
              dataArray={[this.state.pickup, this.state.dropoff]}
              renderRow={this.renderWaypoint}
            />
          </View>
          <View>
            <Text style={styles.paymentTitle}>Payment</Text>
            <View style={{ flexDirection: 'row' }}>
              <Left>
                <View style={{ flexDirection: 'row' }}>
                  <Icon name="card" />
                  <Text style={{ marginTop: 6, marginLeft: 5 }}>
                    Ending in 2356
                  </Text>
                </View>
              </Left>
              <Right>
                <Text>Estimate Fare</Text>
              </Right>
            </View>
          </View>
          <View padder>
            <Button
              block
              style={styles.nextButton}
              onPress={() => {
                Alert.alert(
                  'Ride Booked',
                  'We’ll notify you as soon as we’ve found a driver.',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        Actions.popTo('riderStartupService');
                      },
                    },
                  ],
                  { cancelable: false },
                );
                Actions.popTo('riderStartupService');
              }}
            >
              <Text>Book Ride</Text>
            </Button>
            <Text note>
              We’ll only charge your credit card once your children have arrived
              safely
            </Text>
          </View>
        </Content>
      </Container>
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

export default connect(mapStateToProps, bindActions)(ConfirmRide);
