import React, { Component } from 'react';
import { Field, reduxForm, change, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Switch } from 'react-native';
import PropTypes from 'prop-types';
import { Actions, ActionConst } from 'react-native-router-flux';
import {
  Input,
  Button,
  Label,
  Item,
  Form,
  Picker,
  View,
  Text,
} from 'native-base';
import {
  addPassenger,
  updatePassenger,
  removePassenger,
} from '../../../actions/rider/passenger';

import NavigationBar from '../../common/navigationBar';

import styles from './styles';
import variables from '../../../../native-base-theme/variables/platform';

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'required';
  }
  if (!values.lastName) {
    errors.lastName = 'required';
  }
  if (!values.age) {
    errors.age = 'required';
  }
  if (values.age < 7 && !values.booster) {
    errors.booster = 'required for ages under 7';
  }
  if (!values.securityCode) {
    errors.securityCode = 'required';
  }

  return errors;
};

const pickerHeader = backAction => (
  <NavigationBar title="Choose" back onLeftButtonPress={backAction} />
);

class RiderForm extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    handleSubmit: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
      isfetched: false,
    };
  }

  submit(values) {
    if (!values.id) {
      this.props.dispatch(addPassenger(values));
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.dispatch(
      change('settings', 'homeAddress', nextProps.initialValues.homeAddress),
    );
    nextProps.dispatch(
      change('settings', 'workAddress', nextProps.initialValues.workAddress),
    );
  }

  renderInput({
    inputProps,
    input,
    label,
    helpText,
    renderHelpText,
    showError = true,
    type,
    meta: { touched, error, warning },
  }) {
    const hasError = touched && error !== undefined;

    return (
      <View padder>
        <Item fixedLabel error={hasError}>
          <Label>{label}</Label>
          <Input {...inputProps} {...input} style={{ flex: 1 }} />
        </Item>
        {showError &&
          hasError && (
            <Text
              style={{ color: 'red', position: 'absolute', right: 10, top: 30 }}
            >
              {error}
            </Text>
          )}
        {helpText && <Text note>{helpText}</Text>}
        {renderHelpText && renderHelpText()}
      </View>
    );
  }

  renderSwitch({
    input: { onChange, value, ...restInput },
    label,
    helpText,
    renderHelpText,
    type,
    meta: { touched, error, warning },
  }) {
    const hasError = error !== undefined;

    return (
      <View padder>
        <Item fixedLabel error={hasError} style={{ borderBottomWidth: 0 }}>
          <Label>{label}</Label>
          <Switch value={value} onValueChange={onChange} />
        </Item>
        {hasError && (
          <Text style={{ color: 'red', marginLeft: 2 }}>{error}</Text>
        )}
        {helpText && <Text note>{helpText}</Text>}
        {renderHelpText && renderHelpText()}
      </View>
    );
  }

  renderPicker({
    input: { onChange, value, ...restInput },
    label,
    helpText,
    renderHelpText,
    showError = false,
    type,
    meta: { touched, error, warning },
  }) {
    const hasError = touched && error !== undefined;

    return (
      <View padder>
        <Item fixedLabel error={hasError}>
          <Label>{label}</Label>
          <Picker
            iosHeader="Select One"
            placeholder="Select One"
            mode="dropdown"
            note={false}
            selectedValue={value}
            onValueChange={onChange}
            renderHeader={pickerHeader}
            ref={ref => {
              this.age = ref;
            }}
            style={{ marginRight: -15 }}
          >
            <Picker.Item label="5" value={5} />
            <Picker.Item label="6" value={6} />
            <Picker.Item label="7" value={7} />
            <Picker.Item label="8" value={8} />
            <Picker.Item label="9" value={9} />
            <Picker.Item label="10" value={10} />
            <Picker.Item label="11" value={11} />
            <Picker.Item label="12" value={12} />
            <Picker.Item label="13" value={13} />
            <Picker.Item label="14" value={14} />
            <Picker.Item label="15" value={15} />
            <Picker.Item label="16" value={16} />
            <Picker.Item label="17" value={17} />
            <Picker.Item label="18" value={18} />
          </Picker>
        </Item>
        {showError && hasError && <Text style={{ color: 'red' }}>{error}</Text>}
        {helpText && <Text note>{helpText}</Text>}
        {renderHelpText && renderHelpText()}
      </View>
    );
  }

  render() {
    return (
      <View>
        <Form>
          <Field
            name="firstName"
            label="First Name"
            component={this.renderInput}
          />
          <Field
            name="lastName"
            label="Last Name"
            component={this.renderInput}
          />

          <Field name="age" label="Age" component={this.renderPicker} />

          <Field
            name="securityCode"
            label="Security Code"
            component={this.renderInput}
            renderHelpText={() => (
              <View
                style={{ marginTop: variables.contentPadding / 2, padding: 2 }}
              >
                <Text note style={{ marginBottom: variables.contentPadding }}>
                  Create a secret code word that your rider can remember.
                </Text>

                <Text note style={{ marginBottom: variables.contentPadding }}>
                  The driver will say this at pick-up so your rider know they
                  are with the right person.
                </Text>
              </View>
            )}
          />

          <Field
            name="booster"
            label="Requires Booster Seat"
            component={this.renderSwitch}
            disabled={this.props.age < 7}
            renderHelpText={() => (
              <View
                style={{ marginTop: variables.contentPadding / 2, padding: 2 }}
              >
                <Text note style={{ marginBottom: variables.contentPadding }}>
                  Children under age 7 require a booster seat.
                </Text>
                <Text note>
                  It is recommended that children under 145 cm use a booster
                  seat.
                </Text>
              </View>
            )}
          />

          <Field
            name="phoneNo"
            label="Mobile"
            component={this.renderInput}
            inputProps={{ placeholder: 'Optional', keyboardType: 'phone-pad' }}
            helpText="Member’s contact for pickup notifications"
          />
        </Form>
        <Button
          block
          style={{
            padding: 10,
            height: 50,
            margin: 10,
            marginTop: 20,
          }}
          onPress={this.props.handleSubmit(this.submit.bind(this))}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Save</Text>
        </Button>
      </View>
    );
  }
}
RiderForm = reduxForm({
  form: 'rider', // a unique name for this form
  validate,
})(RiderForm);
RiderForm = connect(state => ({
  initialValues: { booster: true },
}))(RiderForm);
export default RiderForm;
