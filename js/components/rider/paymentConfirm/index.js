import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Text,
  ListItem,
  Button,
  Right,
  Container,
  Left,
  Spinner,
} from 'native-base';
import { Actions } from 'react-native-router-flux';

import NavigationBar from '../../common/navigationBar';
import { payment } from '../../../actions/payment/riderCardPayment';
import ModalView from '../../common/ModalView';

import styles from './styles';

class PaymentConfirm extends Component {
  onSubmitConfirm() {
    const paymentDetails = {
      email: this.props.userEmail,
      amount: this.props.data.amount,
    };
    this.props.payment(paymentDetails);
  }

  showLoaderModal() {
    return (
      <ModalView>
        <Spinner />
      </ModalView>
    );
  }
  render() {
    return (
      <Container>
        <NavigationBar
          title="Confirm Payment"
          back
          onLeftButtonPress={() => Actions.pop()}
        />
        <Content>
          <ListItem style={styles.listItem}>
            <Left style={styles.column}>
              <Text style={styles.text}>Amount</Text>
            </Left>
            <Right style={styles.column}>
              <Text style={styles.text}>
                ${this.props.data.amount}
              </Text>
            </Right>
          </ListItem>
          <Button
            style={styles.button}
            onPress={() => this.onSubmitConfirm()}
          >
            <Text> Confirm </Text>
          </Button>
          {this.props.loader ? this.showLoaderModal() : null}
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.rider.user.email,
    loader: state.rider.rideCardPayment.loadSpinner,
  };
}

function bindActions(dispatch) {
  return {
    payment: data => dispatch(payment(data)),
  };
}

export default connect(mapStateToProps, bindActions)(PaymentConfirm);
