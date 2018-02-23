import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Switch, TouchableOpacity, Modal, Dimensions } from 'react-native';
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
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
let moment = require('moment');
if ('default' in moment) {
  moment = moment.default;
}
import NavigationBar from '../../../common/navigationBar';
import AutoResizingTextInput from '../../../common/autoResizingTextInput';
const { height: h, width: w } = Dimensions.get('window');
import styles from './styles';

class AddPickup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.pickUpAddress) {
      this.setState({ address: nextProps.pickUpAddress })
    }
  }
  render() {
    const today: Date = moment().toDate();
    const minDate: Date = moment()
      .add(1, 'days')
      .toDate();
    const maxDate: Date = moment()
      .add(1, 'years')
      .subtract(1, 'days')
      .toDate();

    return (
      <Container style={styles.container}>
        <NavigationBar
          title="Add Pickup"
          back
          onLeftButtonPress={() => Actions.pop()}
        />
        <Content padder>
          <Form style={styles.form}>
            {/* <InputGroup  last error={false} style={{ minHeight: 70 }}> */}
            <Item
              stackedLabel
              onPress={() => Actions.suggestLocation({ heading: 'Add Pickup' })}
              style={{ minHeight: 55, marginLeft: 0, paddingLeft: 5,alignItems:'flex-start' }}
              >
              <Label style={{ fontSize:17,fontWeight:'600' }}>Pickup Address</Label>
              <Text
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
            {/* </InputGroup> */}
            <InputGroup error={false} style={{ minHeight: 55 }}>
              <Label>Pickup Time</Label>

              <DatePicker
                style={{ width: 200 }}
                date={today}
                mode="time"
                placeholder="select"
                format="hh:mm"
                minDate={minDate}
                maxDate={maxDate}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {},
                  dateInput: {
                    marginLeft: 10,
                    borderWidth: 0,
                  },

                }}
                onDateChange={(date: string) => {
                  this.setState({ date });
                }}
              />
            </InputGroup>
            <InputGroup error={false} style={{ minHeight: 55 }}>
              <Label>Sign-out Rider At Pickup?</Label>
              <Right>
                <Switch />
              </Right>
            </InputGroup>
            <Item stackedLabel error={false} style={{ marginLeft: 0, paddingLeft: 5 }}>
              <Label style={{ color: '#000' }}>Pickup Instructions</Label>
              <AutoResizingTextInput placeholder="e.g. make sure they have their bag" />
            </Item>
          </Form>
          <View padder style={{ backgroundColor: '#fff' }}>
            <Button
              block
              style={styles.nextButton}
              onPress={() => {
                Actions.addDropoff();
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
    pickUpAddress: state.rider.tripRequest.pickUpAddress
  };
}

function bindActions(dispatch) {
  return {
    payment: data => dispatch(payment(data)),
  };
}

export default connect(mapStateToProps, bindActions)(AddPickup);
