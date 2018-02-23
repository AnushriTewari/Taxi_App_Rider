/* @flow */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  Content,
  Input,
  Text,
  Button,
  Container,
  H2,
  Form,
  InputGroup,
  Label,
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
let moment = require('moment');
if ('default' in moment) {
  moment = moment.default;
}
import NavigationBar from '../../common/navigationBar';
import RiderButtonGroup from '../riderButtonGroup';

import styles from './styles';

interface Rider {
  fName: string;
  lName: string;
  imageUri: string;
  selected: boolean;
}

export interface Props {
}

interface State {
  riders: Array<Rider>;
  date: string;
}

class ScheduleRide extends Component<Props, State> {
  state = {
    date:"2018-02-12",
    promoCode: null,
    riders: [
      {
        fName: 'Katie',
        lName: 'Maple',
        imageUri:
          'http://res.cloudinary.com/merry-go-drive/image/upload/v1515345310/ytxrbzdx9beq1cgeo4x1.jpg',
        selected: false,
      },
    ],
  };
  handleRiderSelect = (index: number) => {
    const riders = this.state.riders;
    // riders[index].selected = !riders[index].selected;

    this.setState({ riders });
  };

  render() {
    const today = moment().toDate();
    const minDate = moment()
      .add(1, 'days')
      .toDate();
    const maxDate = moment()
      .add(1, 'years')
      .subtract(1, 'days')
      .toDate();

    const data = this.state;

    const defaultRiders = [
      {
        fName: 'Add',
        imageUri: 'https://image.flaticon.com/icons/png/512/181/181546.png',
      },
      {
        fName: 'Add',
        imageUri: 'https://image.flaticon.com/icons/png/512/181/181546.png',
      },
      {
        fName: 'Add',
        imageUrii: 'https://image.flaticon.com/icons/png/512/181/181546.png',
      },
    ];

    const riders = []
      .concat(data.riders)
      .concat(defaultRiders)
      .slice(0, 3);

    return (
      <Container style={styles.container}>
        <NavigationBar
          title="Schedule no Ride"
          back
          onLeftButtonPress={() => Actions.pop()}
        />
        <Content padder>
          <H2 style={styles.heading}>Select Passengers</H2>
          <RiderButtonGroup
            riders={riders}
            onItemPress={this.handleRiderSelect}
          />

          <Form style={styles.form}>
            <InputGroup error={false}>
              <Label>Ride Date</Label>

              <DatePicker
                style={{ width: 200 }}
                date={this.state.date}
                showIcon={true}
                mode="date"
                placeholder="select date"
                format="ddd DD MMM YYYY"
                minDate={minDate}
                maxDate={maxDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {
                  this.setState({ date: date });
                }}
               
                customStyles={{
                  dateIcon: {},
                  dateInput: {
                    marginLeft: 10,
                    borderWidth: 0,
                  },
                  // ... You can check the source to find the other keys.
                }}
        
              />
            </InputGroup>
            <InputGroup last error={false}>
              <Label>Promo Code</Label>
              <Input placeholder="Optional" />
            </InputGroup>
          </Form>
          <View padder style={styles.nextButton}>
            <Button
              block
              onPress={() => {
                Actions.addPickup();
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

export default connect(mapStateToProps, bindActions)(ScheduleRide);
