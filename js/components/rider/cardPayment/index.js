import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity } from 'react-native';
import {
  Container,
  Text,
  Icon,
  Spinner,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { saveCardDetails } from '../../../actions/payment/riderCardPayment';
import { updatePayment } from '../../../actions/payment/paymentMethod';
import ModalView from '../../common/ModalView';

import NavigationBar from '../../common/navigationBar';

import styles from './styles';

class CardPayment extends Component {
  onSubmit() {
    const userEmail = {
      email: this.props.userEmail,
    };
    this.props.saveCardDetails(userEmail);
  }

  selectCash() {
    this.props.updatePayment('CASH');
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
      <Container style={{ backgroundColor: '#fff' }}>
        <NavigationBar
          title="Payment"
          back
          onLeftButtonPress={() => Actions.pop()}
        />
        <View>
          <View style={styles.cardSelect}>
            <Text
              style={{ fontSize: 14, fontWeight: 'bold', color: '#9BA2A7' }}
            >
              Select how you would like to pay
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            {this.props.appConfig.stripe ? (
              <TouchableOpacity
                style={{
                  ...styles.payCard,
                  borderTopLeftRadius: 4,
                  borderTopRightRadius: 4,
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#eee',
                }}
                onPress={() => this.onSubmit()}
              >
                <Icon name="ios-card" style={{ fontSize: 40, color: '#eee' }} />
                <Text
                  style={{
                    marginLeft: 20,
                    marginTop: 8,
                    color: '#eee',
                    fontWeight: 'bold',
                  }}
                >
                  Credit Card
                </Text>
              </TouchableOpacity>
            ) : null}
            {this.props.ridePayment.cardDetailsLoader
              ? this.showLoaderModal()
              : null}
          </View>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    userEmail: state.rider.user.email,
    ridePayment: state.rider.rideCardPayment,
    appConfig: state.basicAppConfig.config,
  };
}

function bindActions(dispatch) {
  return {
    saveCardDetails: data => dispatch(saveCardDetails(data)),
    updatePayment: data => dispatch(updatePayment(data)),
  };
}

export default connect(mapStateToProps, bindActions)(CardPayment);
