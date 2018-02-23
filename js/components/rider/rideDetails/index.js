import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Image } from 'react-native';
import {
  Content,
  Text,
  List,
  Right,
  Container,
  Left,
  Icon,
  Thumbnail,
} from 'native-base';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
let moment = require('moment');
if ('default' in moment) {
  moment = moment.default;
}
import NavigationBar from '../../common/navigationBar';
import RiderButtonGroup from '../riderButtonGroup';

import variables from '../../../../native-base-theme/variables/platform';
import styles from './styles';

class RideDetails extends Component {
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
    driver: {
      name: 'Sarah Parker',
      profileUrl:
        'https://dhuh3lqp0wlh3.cloudfront.net/be/388720c00311e79a2fe1e5aa085c7e/house-sitter-natalie-i-lenexa-4555a01a.jpg',
      vehicle: {
        make: 'Volvo',
        model: 'XC 60',
        year: '2017',
        color: 'Blue',
        plateNo: 'TSJ-526',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsOV0ss0v9AM3lKxOfM3vc6RWIRVC4KeWaDu-bv-lYaQNuzzHIHg',
      },
    },
    creditCard: '2356'
  };

  renderDriverDetails() {
    return (
      <View>
        <Image
          source={{
            uri: this.state.driver.vehicle.imageUrl,
          }}
          style={{ height: 200 }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
            padding: variables.contentPadding,
          }}
        >
          <View style={{ height: 100 }}>
            <Text>Plate #</Text>
            <Text>{this.state.driver.vehicle.plateNo}</Text>
          </View>
          <View
            style={{
              position: 'absolute',
              top: -40,
              left: variables.deviceWidth / 2 - 50,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Actions.driverDetails();
              }}
            >
              <Thumbnail
                source={{
                  uri: this.state.driver.profileUrl,
                }}
                style={{
                  height: 100,
                  width: 100,
                  marginTop: 10,
                  marginBottom: 10,
                  borderRadius: 50,
                }}
              />
              <Text>
                {this.state.driver.name} <FAIcon name="chevron-right" />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text>{this.state.driver.vehicle.year} {this.state.driver.vehicle.color}</Text>
            <Text>{this.state.driver.vehicle.make} {this.state.driver.vehicle.model}</Text>
          </View>
        </View>
      </View>
    );
  }

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
      <Container style={{ backgroundColor: '#fff' }}>
        <NavigationBar
          title={'FRIDAY 22 FEB 2018'}
          back
          onLeftButtonPress={() => Actions.pop()}
          onRightButtonPress={() => Actions.rideMap()}
          rightButtonText="Map"
        />
        <Content>
          <View style={styles.ridePending}>
            <Text>We’ll notify you as soon as we’ve found you a driver</Text>
          </View>
          {this.renderDriverDetails()}
          <View style={{ padding: variables.contentPadding }}>
            <Text style={styles.itemTitle}>Riders</Text>

            <RiderButtonGroup riders={this.state.riders} />

            <List
              dataArray={[this.state.pickup, this.state.dropoff]}
              renderRow={this.renderWaypoint}
            />
            <View>
              <Text style={styles.paymentTitle}>Payment</Text>
              <View style={{ flexDirection: 'row' }}>
                <Left>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name="card" />
                    <Text style={{ marginTop: 6, marginLeft: 5 }}>
                      Ending in {this.state.creditCard}
                    </Text>
                  </View>
                </Left>
                <Right>
                  <Text>Estimate Fare</Text>
                </Right>
              </View>
            </View>
            <View>
              <Text note>
                We’ll only charge your credit card once your children have
                arrived safely
              </Text>
            </View>
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

export default connect(mapStateToProps, bindActions)(RideDetails);
