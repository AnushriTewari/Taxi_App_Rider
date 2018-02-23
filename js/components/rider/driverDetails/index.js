import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
} from 'react-native';
import {
  Content,
  Text,
  Button,
  Container,
  Icon,
  H3,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
let moment = require('moment');
if ('default' in moment) {
  moment = moment.default;
}
import commonColor from '../../../../native-base-theme/variables/commonColor';
import variables from '../../../../native-base-theme/variables/platform';
import styles from './styles';

class DriverDetails extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Image
            source={{
              uri:
                'https://dhuh3lqp0wlh3.cloudfront.net/be/388720c00311e79a2fe1e5aa085c7e/house-sitter-natalie-i-lenexa-4555a01a.jpg',
            }}
            style={{
              height: 200,
            }}
          />
          <Button
            style={{ position: 'absolute', right: 0, top: 10 }}
            transparent
            onPress={() => Actions.pop()}
          >
          <View style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            width: 35,
            height: 35,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center'
            }}>
            <Icon
              name="ios-close"
              style={{ fontSize: 28, color: commonColor.brandPrimary }}
            />
            </View>
          </Button>
          <View style={{padding: variables.contentPadding}}>
          <H3 style={styles.heading}>Sarah Parker</H3>
          <Text style={{paddingTop: variables.contentPadding}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque accumsan ligula a nisl lacinia dignissim. Nullam neque
            massa, blandit id porta quis, lobortis non justo. Pellentesque
            sodales felis efficitur tortor gravida, posuere suscipit nunc
            sagittis. Quisque fringilla ante in enim interdum pulvinar. Ut orci
            lorem, consequat id ipsum a, ultrices luctus purus.
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

export default connect(mapStateToProps, bindActions)(DriverDetails);
