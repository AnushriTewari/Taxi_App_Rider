import React, { Component } from "react";
import { View } from "react-native";
import { Field, reduxForm } from "redux-form";
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
} from "native-base";
import PropTypes from 'prop-types';
import NavigationBar from '../../common/navigationBar';
import { verify } from "../../../actions/common/register";
import styles from "./styles";
import { connect } from "react-redux";
// import * as appStateSelector from "../../../reducers/rider/appState";
import { Actions } from "react-native-router-flux";
import commonColor from '../../../../native-base-theme/variables/commonColor';
import CodeInput from 'react-native-confirmation-code-input';
const validate = values=>{
  const errors = {};
  if (!values.code) {
    errors.code = "OTP is Required";
  } 
  return errors; 
}
class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cca2: "AU",
      callingCode: "61",
      name: "AU"
    };
  }
  static propTypes = {
    verify: PropTypes.func
  };

  submit(values) {
    this.props.dispatch(
      verify({ ...values, otpValue : this.state.code })
    );
  }
    
  onOTPfull(code) {
    this.setState({code:code})
  }

  render() {
    return (
      <Container>
        <NavigationBar
          title="OTP verify"
          back
        // onLeftButtonPress={() => Actions.pop()}
        />
        <View style={styles.maincontent}>
        <View style={{flex:0.4, backgroundColor:'transparent',alignItems:'center',paddingTop:'10%' }}>
          <Text style={styles.text}>Signed up successfully</Text>
          <Text style={styles.text}>ENTER VERIFICATION CODE</Text>
          <Text style={{ fontSize: 17 }}>no</Text>
          <Text></Text>
          <CodeInput
            ref="codeInputRef1"
            codeLength={6}
            secureTextEntry
            activeColor={commonColor.brandPrimary}
            inactiveColor={commonColor.brandPrimary}
            cellBorderWidth={1.5}
            className={'border-b'}
            space={10}
            size={45}
            inputPosition='center'
            onFulfill={(code) => this.onOTPfull(code)}
            keyboardType={'numeric'}
          />
          </View>
          <View style={{ flex:0.2,flexDirection: "row", backgroundColor: 'transparent',paddingTop:'3%'  }}>
            <Button
              block
              onPress={() => alert('Sent')}
              style={styles.otpBtn}
            >
              <Text>RESEND</Text>
            </Button>
            <Button
              block
              // onPress={this.props.handleSubmit(this.submit.bind(this))}
              // onPress={() => { Actions.riderStartupService()}}
               onPress={() => this.submit()}
              style={styles.otpBtn}
            >
              <Text>VALIDATE</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}
// function bindActions(dispatch) {
//   return {
//     verify:(data) => dispatch(verify(data)),
//   };
// // }
// export default connect(bindActions)(Verify);
export default reduxForm({
  form: "otp", // a unique name for this form
  validate
})(Verify);
